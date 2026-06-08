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
  title: "Ozone Sanitation",
  description:
    "Controlled ozone sanitation in aviation: exposure limits (NIOSH/OSHA/FAA), material compatibility, Azerbaijani patent WO2018137003.",
};

export default async function OzoneSanitationPage() {
  const content = await getSectionContent("ozone-sanitation");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Ozon Sanitasiyası" },
        ]}
      />

      <SectionHero
        title={content.title}
        summary={content.summary}
        tags={content.tags}
      />

      {/* Status claims bar */}
      <div className="px-6 py-4 bg-surface-alt border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
          {content.statusedClaims.map((claim, i) => (
            <StatusLabel
              key={i}
              status={claim.status}
              note={claim.claim.az}
            />
          ))}
        </div>
      </div>

      {/* Exposure limits callout */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <div className="bg-warn-amber-light border border-warn-amber rounded-lg p-4 flex gap-3">
          <span className="text-2xl flex-shrink-0">⚠</span>
          <div>
            <p className="font-semibold text-warn-amber text-sm mb-1">
              Məruz qalma həddi xatırlatması
            </p>
            <p className="text-sm text-foreground">
              NIOSH IDLH: <strong className="font-mono">5 ppm</strong>. OSHA
              PEL (8s TAO): <strong className="font-mono">0.10 ppm</strong>.
              FAA § 121.578 kabin (istənilən vaxt):{" "}
              <strong className="font-mono">0.25 ppm</strong>. Sanitasiya
              prosedurları yalnız boş kabində aparılmalıdır.
            </p>
          </div>
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
