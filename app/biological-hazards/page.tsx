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
  title: "Biological Hazards",
  description:
    "Disease transmission in aviation cabin environments: aerosol, droplet, fomite routes, HEPA filtration role, COVID-19 cluster data.",
};

export default async function BiologicalHazardsPage() {
  const content = await getSectionContent("biological-hazards");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Bioloji Təhlükələr" },
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
            <StatusLabel
              key={i}
              status={claim.status}
              note={claim.claim.az}
            />
          ))}
        </div>
      </div>

      {/* Transmission route quick reference */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: "🌬️",
              label: "Aerozol",
              sub: "≤ 5 μm · saatlarla asılı",
              color: "border-risk-red bg-risk-red-light",
            },
            {
              icon: "💧",
              label: "Damlacıq",
              sub: "> 5 μm · 1–2 m məsafə",
              color: "border-warn-amber bg-warn-amber-light",
            },
            {
              icon: "🖐️",
              label: "Fomit",
              sub: "Səthi kontakt · saatlar–günlər",
              color: "border-info-blue bg-info-blue-light",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg border p-4 flex gap-3 items-start ${item.color}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-tech-gray">{item.sub}</p>
              </div>
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
