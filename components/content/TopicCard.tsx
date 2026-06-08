'use client';

import Link from 'next/link';
import { useLang } from '@/lib/language';
import type { SectionMeta } from '@/types/content';

interface Props {
  section: SectionMeta;
}

export default function TopicCard({ section }: Props) {
  const { t } = useLang();

  return (
    <Link
      href={section.slug}
      className="group flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-av-blue/30 transition-all duration-200"
    >
      {/* Icon header */}
      <div className={`px-5 pt-5 pb-3`}>
        <span className="text-3xl">{section.icon}</span>
      </div>

      {/* Tag strip */}
      <div className="px-5 flex flex-wrap gap-1 mb-2">
        {section.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-tech-gray"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex flex-col flex-1 gap-2">
        <h2 className="font-bold text-av-blue text-sm leading-snug group-hover:text-av-blue-light transition-colors">
          {t(section.title)}
        </h2>
        <p className="text-tech-gray text-xs leading-relaxed flex-1">
          {t(section.summary)}
        </p>
        <span className="text-amber text-xs font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
          {t({ az: 'Oxu →', en: 'Read →' })}
        </span>
      </div>
    </Link>
  );
}
