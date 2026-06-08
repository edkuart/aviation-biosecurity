'use client';

import { useLang } from '@/lib/language';
import { reliabilityConfig } from '@/lib/utils';
import { RELIABILITY_LABELS } from '@/types/sources';
import type { Source } from '@/types/sources';

interface Props {
  source: Source;
}

const regionColors: Record<string, string> = {
  International: 'bg-av-blue/10 text-av-blue',
  Europe:        'bg-purple-50 text-purple-700',
  'United States': 'bg-blue-50 text-blue-700',
  Azerbaijan:    'bg-amber/10 text-amber-dark',
  Other:         'bg-surface text-tech-gray',
};

const typeColors: Record<string, string> = {
  Regulation:          'bg-risk-red-light text-risk-red',
  Guidance:            'bg-warn-amber-light text-warn-amber',
  Paper:               'bg-info-blue-light text-info-blue',
  Patent:              'bg-purple-50 text-purple-700',
  Report:              'bg-surface text-tech-gray',
  'Advisory Circular': 'bg-sky-50 text-sky-700',
};

export default function ResearchCard({ source }: Props) {
  const { t } = useLang();

  return (
    <div className="bg-white border border-border rounded-xl p-5 flex flex-col gap-3 hover:shadow-sm hover:border-av-blue/20 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${reliabilityConfig(source.reliability)}`}
          title={RELIABILITY_LABELS[source.reliability]}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-av-blue leading-snug">{t(source.title)}</p>
          <p className="text-xs text-tech-gray mt-0.5">{source.organization} · {source.year}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${regionColors[source.region]}`}>
          {source.region}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[source.type] ?? 'bg-surface text-tech-gray'}`}>
          {source.type}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-surface text-tech-gray border border-border">
          {RELIABILITY_LABELS[source.reliability]}
        </span>
      </div>

      {/* Summary */}
      <p className="text-xs text-tech-gray leading-relaxed">{t(source.summary)}</p>

      {/* Notes */}
      {source.notes && (
        <p className="text-xs text-warn-amber italic">{source.notes}</p>
      )}

      {/* Link */}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-av-blue hover:underline font-medium self-start mt-auto"
      >
        {t({ az: 'Mənbəyə keç →', en: 'Open source →' })}
      </a>
    </div>
  );
}
