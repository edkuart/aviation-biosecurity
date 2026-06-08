import type { Metadata } from "next";
import { getRiskMatrix } from "@/lib/content";
import RiskMatrixTable from "@/components/data/RiskMatrixTable";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Risk Matrix",
  description:
    "Biological, chemical, material, operational, and regulatory risk comparison across all aviation sanitation methods.",
};

export default async function RiskMatrixPage() {
  const matrix = await getRiskMatrix();

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[{ label: "Ana səhifə", href: "/" }, { label: "Risk Matrisi" }]}
      />

      <section className="bg-av-blue text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">📊</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Risk Matrisi
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Sanasiya Metodları üzrə Risk Müqayisəsi
          </h1>
          <p className="text-white/80 text-base max-w-2xl">
            Bioloji, kimyəvi, material, əməliyyat və normativ risk ölçüləri
            üzrə bütün sanasiya metodlarının interaktiv müqayisəsi.
          </p>
        </div>
      </section>

      <div className="px-6 py-4 bg-surface-alt border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 text-xs text-tech-gray">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-reg-green inline-block" />
            Aşağı risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-warn-amber inline-block" />
            Orta risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-risk-red inline-block" />
            Yüksək risk
          </span>
          <span className="text-tech-gray ml-2">
            Xanaya basaraq ətraflı izahı görə bilərsiniz.
          </span>
        </div>
      </div>

      <div className="px-6 py-8 max-w-5xl mx-auto w-full overflow-x-auto">
        <RiskMatrixTable data={matrix} />
      </div>
    </div>
  );
}
