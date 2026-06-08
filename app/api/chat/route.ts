import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM = `You are an aviation biosecurity study assistant for the Aviation Biosecurity Knowledge Platform — a bilingual (Azerbaijani/English) educational resource.

Topics you cover:
- Regulatory framework: Chicago Convention, ICAO Annexes, WHO IHR 2005, EASA, FAA (14 CFR), Azerbaijan SCAA / NASP 2024-2026
- Ozone sanitation: mechanisms, FAA § 121.578 limits (0.25/0.10 ppm), NIOSH REL, material effects
- Corrosion and materials: Al 2024/7075, Ti-6Al-4V, FAA AC 43-4B, disinfectant compatibility
- Biological hazards: aerosol/droplet/fomite transmission, HEPA filtration, WHO IHR Art. 23-24, ICAO Annex 9
- Cabin air quality: FAR 25.831 (0.55 lb/min, CO₂ ≤5000 ppm), bleed vs no-bleed, CAC events
- Cleaning and sanitation: EASA 2021 guidance, IATA protocol, agent comparison (alcohol/QUAT/H₂O₂)
- Protective coatings: 3-layer system, polyurethane (MIL-PRF-85285), FAA Part 43 / EASA Part-M certification
- Disinsection: WHO ADMP 2023 four methods, permethrin/d-phenothrin, EEA BPR restriction, EPA registration
- UAS airport safety: ICAO Model UAS Regulations, FAA Part 107, EASA EU 2019/947, UTM/U-space, counter-drone

Content status labels in responses:
- ✅ Confirmed — official regulatory source exists
- ⚖ Regulation-dependent — varies by jurisdiction
- 📖 Guidance only — advisory, not mandatory
- ⚠ Needs verification — limited or conflicting evidence

Rules:
- If the user writes in Azerbaijani, ALWAYS respond in Azerbaijani. If in English, respond in English.
- Cite regulatory sources (ICAO Annex number, FAA 14 CFR section, WHO IHR article) whenever relevant.
- Keep responses concise and educational. Avoid absolute legal claims without citing jurisdiction and source.
- If a question falls clearly outside aviation biosecurity scope, say so politely and redirect to relevant topics.`;

export async function POST(req: Request) {
  const body = await req.json();
  const message: string = body.message ?? "";
  const lang: string = body.lang ?? "az";

  if (!message.trim()) {
    return new Response("Empty message", { status: 400 });
  }

  const langHint =
    lang === "az"
      ? "The user prefers Azerbaijani (AZ) language responses. Respond in Azerbaijani unless the user wrote in English."
      : "The user prefers English responses. Respond in English unless the user wrote in Azerbaijani.";

  const stream = await client.messages.stream({
    model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SYSTEM + "\n\n" + langHint,
    messages: [{ role: "user", content: message }],
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
