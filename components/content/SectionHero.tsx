'use client';

import { useLang } from '@/lib/language';
import type { Bilingual } from '@/types/content';

interface Props {
  title: Bilingual;
  summary: Bilingual;
  tags?: string[];
  accentColor?: string;
}

const tagColors: Record<string, string> = {
  ICAO:  'bg-av-blue-light/20 text-white border-av-blue-light/30',
  WHO:   'bg-white/10 text-white border-white/20',
  FAA:   'bg-white/10 text-white border-white/20',
  EASA:  'bg-white/10 text-white border-white/20',
  AZ:    'bg-academic-gold/20 text-academic-gold border-academic-gold/30',
  EPA:   'bg-white/10 text-white border-white/20',
  NIOSH: 'bg-white/10 text-white border-white/20',
  WIPO:  'bg-white/10 text-white border-white/20',
};

export default function SectionHero({ title, summary, tags = [] }: Props) {
  const { t } = useLang();

  return (
    <div className="bg-av-navy text-white px-6 py-10 md:py-14 rounded-xl mb-8">
      <div className="max-w-3xl">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full border font-mono tracking-wide ${tagColors[tag] ?? 'bg-white/10 text-white border-white/20'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Bilingual hero title — AZ primary, EN subtitle */}
        <div className="bi mb-3">
          <h1 className="az text-2xl md:text-3xl font-bold leading-tight">
            {title.az}
          </h1>
          <span className="en text-white/60 text-sm font-normal mt-1">
            {title.en}
          </span>
        </div>
        <p className="text-white/80 text-base leading-relaxed max-w-2xl">
          {t(summary)}
        </p>
      </div>
    </div>
  );
}
