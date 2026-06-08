'use client';

import Link from 'next/link';
import { useLang } from '@/lib/language';
import type { SectionMeta } from '@/types/content';

interface Props {
  section: SectionMeta;
}

export default function TopicCard({ section }: Props) {
  const { t, lang } = useLang();

  return (
    <Link
      href={section.slug}
      className="group flex flex-col bg-white border border-border rounded-xl overflow-hidden
        hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 hover:border-av-blue/20
        transition-all duration-200"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Icon header */}
      <div className="px-5 pt-5 pb-3">
        <span className="text-3xl">{section.icon}</span>
      </div>

      {/* Tag strip */}
      <div className="px-5 flex flex-wrap gap-1 mb-2">
        {section.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-surface-alt border border-border text-tech-gray font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex flex-col flex-1 gap-2">
        {/* Bilingual title — AZ primary, EN muted below */}
        <div className="bi">
          <span className="az font-bold text-av-navy text-sm leading-snug group-hover:text-av-blue transition-colors">
            {section.title.az}
          </span>
          <span className="en">{section.title.en}</span>
        </div>

        <p className="text-tech-gray text-xs leading-relaxed flex-1">
          {t(section.summary)}
        </p>

        <span className="text-academic-gold text-xs font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
          {lang === 'az' ? 'Oxu' : 'Read'} ›
        </span>
      </div>
    </Link>
  );
}
