'use client';

import { useState } from 'react';
import { useLang } from '@/lib/language';
import type { ExpandableSection } from '@/types/content';

interface Props {
  section: ExpandableSection;
}

export default function ExpandableBlock({ section }: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(section.defaultOpen ?? false);

  return (
    <div className="border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-white hover:bg-surface transition-colors text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-av-navy text-sm leading-snug">
          {t({ az: section.titleAz, en: section.titleEn })}
        </span>
        <span
          className={`text-academic-gold transition-transform duration-200 text-base shrink-0 ${open ? 'rotate-90' : ''}`}
        >
          ›
        </span>
      </button>

      {/* CSS grid animation — no layout shift, always mounted */}
      <div className={`expandable-grid${open ? ' open' : ''}`}>
        <div>
          <div className="px-5 py-4 border-t border-border bg-surface-alt">
            <div
              className="prose prose-sm max-w-none text-sm leading-relaxed text-ink-soft
                [&_strong]:text-av-navy [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1
                [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3
                [&_h4]:font-semibold [&_h4]:text-av-navy [&_h4]:mt-4 [&_h4]:mb-2"
              dangerouslySetInnerHTML={{
                __html: t({ az: section.bodyAz, en: section.bodyEn }),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
