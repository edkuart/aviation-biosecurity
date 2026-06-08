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
  title: "Cleaning and Sanitation",
  description:
    "Aircraft cabin cleaning, disinfection, and sanitation: EASA protocols, agent comparison, IATA guidance, material compatibility.",
};

export default async function CleaningSanitationPage() {
  const content = await getSectionContent("cleaning-sanitation");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Təmizlik və Sanitasiya" },
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

      {/* Concept ladder */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-semibold text-tech-gray uppercase tracking-wide mb-3">
          Anlayışlar ardıcıllığı
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch">
          {[
            { step: "1", label: "Təmizlik", sub: "Üzvi material uzaqlaşdırılır", color: "bg-surface-alt border-border" },
            { step: "→", label: "", sub: "", color: "hidden sm:flex bg-transparent border-0 items-center justify-center text-tech-gray text-xl" },
            { step: "2", label: "Dezinfeksiya", sub: "Patogenlər azaldılır", color: "bg-info-blue-light border-info-blue" },
            { step: "→", label: "", sub: "", color: "hidden sm:flex bg-transparent border-0 items-center justify-center text-tech-gray text-xl" },
            { step: "3", label: "Sanitasiya", sub: "Tam gigiyena standartı", color: "bg-reg-green-light border-reg-green" },
          ].map((item, i) =>
            item.label === "" ? (
              <div key={i} className={`border rounded-lg px-2 ${item.color}`}>
                →
              </div>
            ) : (
              <div
                key={i}
                className={`flex-1 border rounded-lg p-4 ${item.color}`}
              >
                <span className="text-xs font-mono text-tech-gray">
                  {item.step}
                </span>
                <p className="font-semibold text-sm mt-1">{item.label}</p>
                <p className="text-xs text-tech-gray">{item.sub}</p>
              </div>
            )
          )}
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
