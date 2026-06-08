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
  ICAO:  'bg-av-blue/10 text-av-blue border-av-blue/20',
  WHO:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  FAA:   'bg-blue-50 text-blue-700 border-blue-200',
  EASA:  'bg-purple-50 text-purple-700 border-purple-200',
  AZ:    'bg-amber/10 text-amber-dark border-amber/20',
  EPA:   'bg-green-50 text-green-700 border-green-200',
  NIOSH: 'bg-red-50 text-red-700 border-red-200',
  WIPO:  'bg-sky-50 text-sky-700 border-sky-200',
};

export default function SectionHero({ title, summary, tags = [] }: Props) {
  const { t } = useLang();

  return (
    <div className="bg-av-blue text-white px-6 py-10 md:py-14 rounded-xl mb-8">
      <div className="max-w-3xl">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${tagColors[tag] ?? 'bg-white/10 text-white border-white/20'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
          {t(title)}
        </h1>
        <p className="text-white/80 text-base leading-relaxed max-w-2xl">
          {t(summary)}
        </p>
      </div>
    </div>
  );
}
