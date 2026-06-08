import Link from "next/link";
import { getHomepageSections, getSources } from "@/lib/content";
import TopicCard from "@/components/content/TopicCard";
import ResearchCard from "@/components/data/ResearchCard";
import StudyChatPlaceholder from "@/components/assistant/StudyChatPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviation Biosecurity Knowledge Platform",
  description:
    "Academic study platform for aviation cabin biosecurity, sanitation, ozone, corrosion, disinsection, and airport drone safety.",
};

export default async function HomePage() {
  const sections = await getHomepageSections();
  const allSources = await getSources();
  const featuredSources = allSources.slice(0, 4);

  // Remove home entry from section cards
  const sectionCards = sections.filter((s) => s.id !== "home");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-av-blue text-white px-6 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✈</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Akademik Tədris Platforması
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
            Aviasiya Biosəlamatlığı
            <br />
            <span className="text-amber">Bilgi Platformu</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8 leading-relaxed">
            Kabin biosəlamatlığı, sanasiya, ozon sanitasiyası, korroziya,
            dezinseksiya və hava limanı dron təhlükəsizliyi üzrə akademik tədris
            resursu. ICAO, ÜST, EASA, FAA və Azərbaycan SCAA mənbələrindən.
          </p>
          <div className="flex flex-wrap gap-3">
            {["ICAO", "ÜST/WHO", "EASA", "FAA", "AZ SCAA"].map((agency) => (
              <span
                key={agency}
                className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-mono"
              >
                {agency}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Status legend */}
      <section className="bg-surface-alt border-b border-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 text-xs text-tech-gray">
          <span className="font-medium text-foreground">Məlumat statusu:</span>
          <span className="flex items-center gap-1">
            <span className="text-reg-green font-bold">✅</span> Təsdiqlənmiş
          </span>
          <span className="flex items-center gap-1">
            <span className="text-info-blue font-bold">⚖</span>{" "}
            Tənzimləmədən asılı
          </span>
          <span className="flex items-center gap-1">
            <span className="text-tech-gray font-bold">📖</span> Yalnız
            rəhbərlik
          </span>
          <span className="flex items-center gap-1">
            <span className="text-warn-amber font-bold">⚠</span> Yoxlama
            lazımdır
          </span>
        </div>
      </section>

      {/* Topic cards grid */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-av-blue mb-2">
            Tədris Mövzuları
          </h2>
          <p className="text-tech-gray text-sm mb-8">
            14 mövzu — hər birinin genişləndirilə bilən izahatları, mənbə
            istinadları, lüğət terminləri və imtahan sualları var.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionCards.map((section) => (
              <TopicCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* Study assistant preview */}
      <section className="bg-surface-alt border-t border-b border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-av-blue mb-1">
                Tədris Köməkçisi
              </h2>
              <p className="text-tech-gray text-sm">
                Mövzular üzrə suallarınızı verin. Mənbə istinadları ilə cavab
                alın.
              </p>
            </div>
            <Link
              href="/study-assistant"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-av-blue text-white text-sm hover:bg-av-blue-dark transition-colors"
            >
              Tam ekrana aç →
            </Link>
          </div>
          <div className="max-h-[480px] overflow-hidden rounded-xl shadow-sm border border-border">
            <StudyChatPlaceholder />
          </div>
          <Link
            href="/study-assistant"
            className="mt-4 sm:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-av-blue text-white text-sm hover:bg-av-blue-dark transition-colors"
          >
            Tam ekrana aç →
          </Link>
        </div>
      </section>

      {/* Featured sources */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-av-blue mb-1">
                Seçilmiş Mənbələr
              </h2>
              <p className="text-tech-gray text-sm">
                32 annotasiyalı mənbə — normativ sənədlər, rəhbərlik
                materialları, tədqiqat məqalələri, patentlər.
              </p>
            </div>
            <Link
              href="/research-library"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-av-blue text-av-blue text-sm hover:bg-av-blue hover:text-white transition-colors"
            >
              Hamısını gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredSources.map((source) => (
              <ResearchCard key={source.id} source={source} />
            ))}
          </div>
          <Link
            href="/research-library"
            className="mt-4 sm:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-av-blue text-av-blue text-sm hover:bg-av-blue hover:text-white transition-colors"
          >
            Bütün mənbələri gör →
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-av-blue text-white px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { href: "/risk-matrix", icon: "📊", label: "Risk Matrisi" },
            { href: "/glossary", icon: "📖", label: "Lüğət" },
            { href: "/research-library", icon: "📚", label: "Kitabxana" },
            { href: "/study-assistant", icon: "💬", label: "Köməkçi" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-center group"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-white/90 group-hover:text-white">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
