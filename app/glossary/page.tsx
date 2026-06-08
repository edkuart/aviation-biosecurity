import type { Metadata } from "next";
import { getGlossary } from "@/lib/content";
import GlossaryTerm from "@/components/glossary/GlossaryTerm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Key technical terms in aviation biosecurity — in Azerbaijani and English.",
};

export default async function GlossaryPage() {
  const terms = await getGlossary();

  const sorted = [...terms].sort((a, b) =>
    a.termAz.localeCompare(b.termAz, "az")
  );

  const grouped = sorted.reduce<Record<string, typeof terms>>((acc, term) => {
    const letter = term.termAz[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b, "az")
  );

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[{ label: "Ana səhifə", href: "/" }, { label: "Lüğət" }]}
      />

      <section className="bg-av-blue text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">📖</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Lüğət
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Texniki Terminlər
          </h1>
          <p className="text-white/80 text-base max-w-2xl">
            Aviasiya biosəlamatlığı üzrə əsas texniki terminlər — Azərbaycan
            dilindəki əsas tərif, ingilis dili ekvivalenti ilə.
          </p>
        </div>
      </section>

      {/* Letter index */}
      <div className="px-6 py-3 bg-surface-alt border-b border-border sticky top-14 z-10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-7 h-7 flex items-center justify-center rounded text-xs font-bold bg-white border border-border text-av-blue hover:bg-av-blue hover:text-white transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-8">
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <h2 className="text-2xl font-bold text-av-blue border-b-2 border-av-blue pb-1 mb-4 w-8">
              {letter}
            </h2>
            <div className="space-y-3">
              {grouped[letter].map((term, i) => (
                <GlossaryTerm key={i} entry={term} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
