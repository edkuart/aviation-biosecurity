'use client';

import { useLang } from '@/lib/language';

interface ComparisonRow {
  dimension: { az: string; en: string };
  values: { az: string; en: string }[];
}

interface Props {
  headers: { az: string; en: string }[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({ headers, rows }: Props) {
  const { lang } = useLang();

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-surface border-b border-border">
            <th className="px-4 py-3 text-left text-xs font-semibold text-av-blue min-w-36">
              {lang === 'az' ? 'Ölçü' : 'Dimension'}
            </th>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-av-blue min-w-36">
                {lang === 'az' ? h.az : h.en}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
              <td className="px-4 py-3 text-xs font-medium text-tech-gray">
                {lang === 'az' ? row.dimension.az : row.dimension.en}
              </td>
              {row.values.map((val, j) => (
                <td key={j} className="px-4 py-3 text-xs text-foreground leading-relaxed">
                  {lang === 'az' ? val.az : val.en}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
