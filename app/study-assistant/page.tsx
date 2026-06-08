import type { Metadata } from "next";
import StudyChatPlaceholder from "@/components/assistant/StudyChatPlaceholder";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Study Assistant",
  description:
    "Ask questions about aviation biosecurity topics. Get answers with source citations.",
};

export default function StudyAssistantPage() {
  return (
    <div className="flex flex-col flex-1">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Tədris Köməkçisi" },
        ]}
      />

      <section className="bg-av-blue text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">💬</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Tədris Köməkçisi
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Aviasiya Biosəlamatlığı üzrə Suallar
          </h1>
          <p className="text-white/80 text-sm max-w-2xl">
            Aviasiya biosəlamatlığı mövzularında suallarınızı verin. Claude AI
            normativ çərçivə, insektisidlər, kabin hava keyfiyyəti, dezinfeksiya
            və daha çox mövzuda AZ/EN cavab verir.
          </p>
        </div>
      </section>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-6">
        <div className="flex-1 min-h-[500px] border border-border rounded-xl shadow-sm overflow-hidden bg-white">
          <StudyChatPlaceholder />
        </div>
        <p className="text-xs text-tech-gray mt-3 text-center">
          Claude Haiku · Cavablar rəsmi normativ mənbələrə əsaslanır · Hüquqi
          məsləhət deyil
        </p>
      </div>
    </div>
  );
}
