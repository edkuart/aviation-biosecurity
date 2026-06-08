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
  title: "Disinsection",
  description:
    "Aviation disinsection: WHO ADMP 2023 methods, permethrin and d-phenothrin, countries requiring disinsection, EEA/EPA restrictions, passenger health.",
};

export default async function DisinsectionPage() {
  const content = await getSectionContent("disinsection");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Dezinseksiya" },
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

      {/* WHO methods quick-reference */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-semibold text-tech-gray uppercase tracking-wide mb-3">
          ÜST ADMP 2023 — Onaylı metodlar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              num: "1",
              label: "Uçuş zamanı sprey",
              sub: "Müsafirlərin varlığında permetrin aerosolu",
              color: "border-risk-red bg-risk-red/5",
              badge: "In-flight",
            },
            {
              num: "2",
              label: "Uçuşdan əvvəl sprey",
              sub: "Kabin boşaldıldıqdan sonra 30 dəq. qapalı",
              color: "border-warn-amber bg-warn-amber/5",
              badge: "Pre-departure",
            },
            {
              num: "3",
              label: "Residual sprey",
              sub: "Gizli sahələrə — 8 həftəyə qədər effektiv",
              color: "border-info-blue bg-info-blue/5",
              badge: "Residual",
            },
            {
              num: "4",
              label: "Kombinasiya",
              sub: "2 + 3 metodun birgə tətbiqi",
              color: "border-reg-green bg-reg-green/5",
              badge: "Combined",
            },
          ].map((m, i) => (
            <div
              key={i}
              className={`border rounded-lg p-4 flex gap-3 items-start ${m.color}`}
            >
              <span className="text-2xl font-bold text-tech-gray opacity-40 leading-none">
                {m.num}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">
                    {m.label}
                  </span>
                  <span className="text-xs font-mono text-tech-gray">
                    {m.badge}
                  </span>
                </div>
                <p className="text-xs text-tech-gray">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active substances note */}
        <div className="mt-3 px-4 py-3 bg-surface-alt rounded-lg border border-border text-xs text-tech-gray flex flex-wrap gap-4">
          <span>
            <strong>Aktiv maddə 1:</strong> Permetrin (aerosol + residual)
          </span>
          <span>
            <strong>Aktiv maddə 2:</strong> d-Fenotrin (aerosol)
          </span>
          <span className="text-risk-red">
            <strong>AİA:</strong> Permetrin BPR ilə məhdudlaşdırılmışdır
          </span>
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
