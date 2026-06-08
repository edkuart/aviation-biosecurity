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
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-surface hover:bg-surface-alt transition-colors text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-av-blue text-sm">
          {t({ az: section.titleAz, en: section.titleEn })}
        </span>
        <span
          className={`text-tech-gray transition-transform duration-200 text-sm shrink-0 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="px-5 py-4 border-t border-border bg-white">
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground
              [&_strong]:text-av-blue [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1
              [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_h4]:font-semibold [&_h4]:text-av-blue [&_h4]:mt-4 [&_h4]:mb-2"
            dangerouslySetInnerHTML={{
              __html: t({ az: section.bodyAz, en: section.bodyEn }),
            }}
          />
        </div>
      )}
    </div>
  );
}
