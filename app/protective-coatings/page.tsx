import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectionContent } from "@/lib/content";
import SectionHero from "@/components/content/SectionHero";
import ExpandableBlock from "@/components/content/ExpandableBlock";
import SourcePanel from "@/components/content/SourcePanel";
import StudyQuestionBlock from "@/components/content/StudyQuestionBlock";
import StatusLabel from "@/components/content/StatusLabel";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Protective Coatings",
  description:
    "Epoxy primer, polyurethane topcoat, ADI coating systems, FAA/EASA certification requirements for aircraft protective coatings.",
};

export default async function ProtectiveCoatingsPage() {
  const content = await getSectionContent("protective-coatings");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Qoruyucu Örtüklər" },
        ]}
      />

      <SectionHero
        title={content.title}
        summary={content.summary}
        tags={content.tags}
      />

      {/* Status claims */}
      <div className="px-6 py-4 bg-surface-alt border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
          {content.statusedClaims.map((claim, i) => (
            <StatusLabel key={i} status={claim.status} note={claim.claim.az} />
          ))}
        </div>
      </div>

      {/* Layer diagram */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-semibold text-tech-gray uppercase tracking-wide mb-3">
          Örtük sistem layları
        </h2>
        <div className="flex flex-col gap-1">
          {[
            { label: "Topcoat (Poliuretan)", sub: "UV · mexaniki · kimyəvi qoruma", color: "bg-info-blue text-white", std: "MIL-PRF-85285" },
            { label: "Epoksi Primer", sub: "Korroziya inhibitoru baza qatı", color: "bg-av-blue text-white", std: "MIL-PRF-23377" },
            { label: "Kimyəvi Konversiya / Anodlaşdırma", sub: "Metal səthinə birbaşa korroziya qoruması", color: "bg-av-blue-dark text-white", std: "Alodine / Chromate" },
            { label: "Metal substrat (Al, Ti, paslanmaz polad)", sub: "Əsas konstruksiya materialı", color: "bg-tech-gray text-white", std: "" },
          ].map((layer, i) => (
            <div
              key={i}
              className={`rounded px-4 py-3 flex justify-between items-center ${layer.color}`}
            >
              <div>
                <p className="font-semibold text-sm">{layer.label}</p>
                <p className="text-xs opacity-80">{layer.sub}</p>
              </div>
              {layer.std && (
                <span className="text-xs font-mono opacity-70 hidden sm:block">
                  {layer.std}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-4">
        {content.expandableSections.map((section, i) => (
          <ExpandableBlock key={i} section={section} />
        ))}
      </div>

      {/* Key terms */}
      {content.keyTerms.length > 0 && (
        <div className="px-6 py-8 bg-surface-alt border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-av-blue mb-4">
              Əsas Terminlər
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.keyTerms.map((term, i) => (
                <div
                  key={i}
                  className="bg-white border border-border rounded-lg p-4"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-av-blue">
                      {term.termAz}
                    </span>
                    <span className="text-tech-gray text-sm italic">
                      {term.termEn}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {term.definitionAz}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Study questions */}
      <div className="px-6 py-8 max-w-4xl mx-auto w-full">
        <StudyQuestionBlock questions={content.studyQuestions} />
      </div>

      {/* Source panel */}
      <div className="px-6 pb-10 max-w-4xl mx-auto w-full">
        <SourcePanel sourceIds={content.sourceIds} />
      </div>
    </div>
  );
}
