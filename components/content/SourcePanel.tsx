'use client';

import { useState } from 'react';
import { useLang } from '@/lib/language';
import { getSourcesByIds } from '@/lib/content';
import { reliabilityConfig } from '@/lib/utils';
import { RELIABILITY_LABELS } from '@/types/sources';

interface Props {
  sourceIds: string[];
}

const regionColors: Record<string, string> = {
  Global:   'bg-av-blue/10 text-av-blue border-av-blue/20',
  USA:      'bg-info-blue-bg text-info-blue border-info-blue/30',
  EU:       'bg-info-blue-bg text-info-blue border-info-blue/30',
  AZ:       'bg-academic-gold/10 text-amber-dark border-academic-gold/30',
  WHO:      'bg-confirm-green-bg text-confirm-green border-confirm-green/30',
};

export default function SourcePanel({ sourceIds }: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const sources = getSourcesByIds(sourceIds);

  if (sources.length === 0) return null;

  return (
    <div className="mt-8 border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-3.5 bg-white hover:bg-surface transition-colors text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-av-navy">
          <span>📚</span>
          <span>{t({ az: 'Mənbələr', en: 'Sources' })}</span>
          <span className="bg-av-navy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold font-mono">
            {sources.length}
          </span>
        </span>
        <span className={`text-academic-gold text-base transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>›</span>
      </button>

      {/* CSS grid animation */}
      <div className={`expandable-grid${open ? ' open' : ''}`}>
        <div>
          <div className="divide-y divide-border">
            {sources.map((src) => (
              <div key={src.id} className="px-5 py-4 bg-white hover:bg-surface transition-colors">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${reliabilityConfig(src.reliability)}`}
                    title={RELIABILITY_LABELS[src.reliability]}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-av-navy truncate">
                        {t(src.title)}
                      </span>
                      {/* Monospace type badge */}
                      <span className="text-xs px-1.5 py-0.5 bg-surface-alt border border-border rounded font-mono text-tech-gray shrink-0">
                        {src.type}
                      </span>
                      {/* Region badge */}
                      <span className={`text-xs px-1.5 py-0.5 rounded border font-mono shrink-0 ${regionColors[src.region] ?? 'bg-surface border-border text-tech-gray'}`}>
                        {src.region}
                      </span>
                      <span className="text-xs text-tech-gray shrink-0">{src.year}</span>
                    </div>
                    <p className="text-xs text-tech-gray leading-relaxed mb-2">{t(src.summary)}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-ink-soft font-medium">{src.organization}</span>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-av-blue-light hover:underline"
                      >
                        {t({ az: 'Mənbəyə keç ›', en: 'Open source ›' })}
                      </a>
                      {src.notes && (
                        <span className="text-xs text-warn-amber italic">{src.notes}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
