'use client';

import { useLang } from '@/lib/language';
import type { GlossaryEntry } from '@/types/content';

interface Props {
  entry: GlossaryEntry;
}

export default function GlossaryTerm({ entry }: Props) {
  const { lang } = useLang();

  const primaryTerm  = lang === 'az' ? entry.termAz       : entry.termEn;
  const secondaryTerm = lang === 'az' ? entry.termEn      : entry.termAz;
  const definition   = lang === 'az' ? entry.definitionAz : entry.definitionEn;

  return (
    <div className="py-4 pl-4 border-b border-border last:border-0 border-l-4 border-l-academic-gold">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
        <span className="font-bold text-av-navy text-sm">{primaryTerm}</span>
        <span className="text-xs text-tech-gray italic">{secondaryTerm}</span>
      </div>
      <p className="text-sm text-ink-soft leading-relaxed">{definition}</p>
    </div>
  );
}
