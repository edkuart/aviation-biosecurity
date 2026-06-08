import type { Metadata } from "next";
import { getSources } from "@/lib/content";
import ResearchCard from "@/components/data/ResearchCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { SourceType } from "@/types/sources";

export const metadata: Metadata = {
  title: "Research Library",
  description:
    "Annotated bibliography of all cited aviation biosecurity sources: regulations, guidance documents, research papers, patents.",
};

const TYPE_LABELS: Record<SourceType, string> = {
  Regulation: "Normativ sənəd",
  Guidance: "Rəhbərlik",
  Paper: "Tədqiqat məqaləsi",
  Patent: "Patent",
  Report: "Hesabat",
  "Advisory Circular": "Məsləhət Sirkulyarı",
};

const typeOrder: SourceType[] = [
  "Regulation",
  "Advisory Circular",
  "Guidance",
  "Paper",
  "Patent",
  "Report",
];

export default async function ResearchLibraryPage() {
  const sources = await getSources();

  const byType = sources.reduce<Partial<Record<SourceType, typeof sources>>>(
    (acc, source) => {
      if (!acc[source.type]) acc[source.type] = [];
      acc[source.type]!.push(source);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Ana səhifə", href: "/" },
          { label: "Tədqiqat Kitabxanası" },
        ]}
      />

      <section className="bg-av-blue text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">📚</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Tədqiqat Kitabxanası
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Annotasiyalı Biblioqrafiya
          </h1>
          <p className="text-white/80 text-base max-w-2xl">
            {sources.length} mənbə — normativ sənədlər, rəhbərlik materialları,
            tədqiqat məqalələri, patentlər. Hər mənbə etibarlılıq dərəcəsi,
            region və növ ilə qeyd edilmişdir.
          </p>
        </div>
      </section>

      {/* Reliability legend */}
      <div className="px-6 py-3 bg-surface-alt border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 text-xs text-tech-gray">
          <span className="font-medium text-foreground">
            Etibarlılıq dərəcəsi:
          </span>
          {(
            [
              ["1", "bg-reg-green", "Birinci mənbə (normativ)"],
              ["2", "bg-info-blue", "Rəsmi texniki rəhbərlik"],
              ["3", "bg-amber", "Nəzərdən keçirilmiş tədqiqat"],
              ["4", "bg-warn-amber", "Sənaye texniki sənədi"],
              ["5", "bg-tech-gray", "Patent"],
              ["6", "bg-risk-red", "Tədris / İstinad"],
            ] as const
          ).map(([level, color, label]) => (
            <span key={level} className="flex items-center gap-1.5">
              <span
                className={`w-4 h-4 rounded-full ${color} text-white text-xs font-bold flex items-center justify-center`}
              >
                {level}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Sources by type */}
      <div className="px-6 py-8 max-w-5xl mx-auto w-full space-y-10">
        {typeOrder.map((type) => {
          const group = byType[type];
          if (!group || group.length === 0) return null;
          return (
            <div key={type}>
              <h2 className="text-lg font-bold text-av-blue mb-4 flex items-center gap-2">
                <span className="text-sm font-mono bg-surface-alt border border-border px-2 py-0.5 rounded text-tech-gray">
                  {group.length}
                </span>
                {TYPE_LABELS[type]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.map((source) => (
                  <ResearchCard key={source.id} source={source} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
