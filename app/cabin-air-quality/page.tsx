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
  title: "Cabin Air Quality",
  description:
    "Aircraft cabin air systems, HEPA filtration, FAR 25.831 minimum airflow, FAA § 121.578 ozone limits, bleed air contamination.",
};

export default async function CabinAirQualityPage() {
  const content = await getSectionContent("cabin-air-quality");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Kabin Hava Keyfiyyəti" },
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

      {/* Key limits quick reference */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-semibold text-tech-gray uppercase tracking-wide mb-3">
          Əsas tənzimləmə hədləri
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Min. hava axını",
              value: "0.55 lb/dəq",
              sub: "FAR 25.831 — müsafir başına",
              color: "border-reg-green bg-reg-green-light text-reg-green",
            },
            {
              label: "Ozon (istənilən vaxt)",
              value: "0.25 ppm max",
              sub: "FAA § 121.578 — uçuş kabini",
              color: "border-warn-amber bg-warn-amber-light text-warn-amber",
            },
            {
              label: "Ozon (3s TAO)",
              value: "0.10 ppm max",
              sub: "FAA § 121.578 — 3 saatdan artıq uçuş",
              color: "border-info-blue bg-info-blue-light text-info-blue",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg border p-4 ${item.color}`}
            >
              <p className="text-xs font-medium mb-1">{item.label}</p>
              <p className="text-xl font-bold font-mono">{item.value}</p>
              <p className="text-xs mt-1 opacity-80">{item.sub}</p>
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
