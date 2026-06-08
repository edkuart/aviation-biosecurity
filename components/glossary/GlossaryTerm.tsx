'use client';

import { useLang } from '@/lib/language';
import type { GlossaryEntry } from '@/types/content';

interface Props {
  entry: GlossaryEntry;
}

export default function GlossaryTerm({ entry }: Props) {
  const { lang } = useLang();

  return (
    <div className="py-4 border-b border-border last:border-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <span className="font-bold text-av-blue text-sm">
          {lang === 'az' ? entry.termAz : entry.termEn}
        </span>
        <span className="text-xs text-tech-gray italic">
          {lang === 'az' ? entry.termEn : entry.termAz}
        </span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        {lang === 'az' ? entry.definitionAz : entry.definitionEn}
      </p>
    </div>
  );
}
