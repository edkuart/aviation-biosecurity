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
  title: "UAS Airport Safety",
  description:
    "Airport UAS safety: ICAO Model UAS Regulations, FAA Part 107, EASA EU 2019/947, counter-drone systems, ATC coordination, UTM.",
};

export default async function UasAirportSafetyPage() {
  const content = await getSectionContent("uas-airport-safety");
  if (!content) notFound();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Hava Limanı PUA Təhlükəsizliyi" },
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

      {/* Regulatory framework comparison */}
      <div className="px-6 pt-6 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-semibold text-tech-gray uppercase tracking-wide mb-3">
          Normativ çərçivə müqayisəsi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              org: "ICAO",
              doc: "Model UAS Regulations (2020)",
              type: "İxtiyari",
              color: "border-info-blue bg-info-blue/5",
              badge: "Guidance",
              badgeColor: "text-info-blue",
              points: ["Qeydiyyat tələbi", "Remote ID", "UTM çərçivəsi"],
            },
            {
              org: "FAA",
              doc: "14 CFR Part 107",
              type: "Məcburi (ABŞ)",
              color: "border-av-blue bg-av-blue/5",
              badge: "Regulation",
              badgeColor: "text-av-blue",
              points: ["55 lbs / 400 ft", "Remote Pilot Cert.", "LAANC icazəsi"],
            },
            {
              org: "EASA",
              doc: "EU 2019/947",
              type: "Məcburi (AB)",
              color: "border-reg-green bg-reg-green/5",
              badge: "Regulation",
              badgeColor: "text-reg-green",
              points: ["3 kateqoriya", "SORA qiymət.", "U-space"],
            },
          ].map((f, i) => (
            <div key={i} className={`border rounded-lg p-4 ${f.color}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-foreground">{f.org}</span>
                <span className={`text-xs font-mono ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>
              <p className="text-xs font-mono text-tech-gray mb-1">{f.doc}</p>
              <p className="text-xs text-tech-gray mb-2">{f.type}</p>
              <ul className="text-xs text-foreground space-y-1">
                {f.points.map((p, j) => (
                  <li key={j} className="flex items-center gap-1">
                    <span className="text-tech-gray">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Risk strip */}
        <div className="mt-3 px-4 py-3 bg-risk-red/5 border border-risk-red/20 rounded-lg text-xs text-foreground flex flex-wrap gap-6">
          <span>
            <strong className="text-risk-red">Müsadimə riski:</strong> 1 kq
            drone ≈ 25 kq quş (EASA)
          </span>
          <span>
            <strong className="text-warn-amber">Gatwick 2018:</strong> 36 saat
            bağlı, 1000+ uçuş ləğv
          </span>
          <span>
            <strong className="text-info-blue">Remote ID:</strong> FAA 2023-dən
            məcburi
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
