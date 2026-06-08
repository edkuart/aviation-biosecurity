'use client';

import { useState } from 'react';
import { useLang } from '@/lib/language';

interface RiskCell {
  level: string;
  noteAz: string;
  noteEn: string;
}

interface RiskMethod {
  id: string;
  labelAz: string;
  labelEn: string;
  cells: Record<string, RiskCell>;
}

interface RiskDimension {
  id: string;
  labelAz: string;
  labelEn: string;
}

interface RiskMatrixData {
  dimensions: RiskDimension[];
  methods: RiskMethod[];
}

interface Props {
  data: RiskMatrixData;
}

const levelStyles: Record<string, string> = {
  low:    'bg-reg-green-light text-reg-green font-semibold',
  medium: 'bg-warn-amber-light text-warn-amber font-semibold',
  high:   'bg-risk-red-light text-risk-red font-semibold',
};

const levelLabels: Record<string, { az: string; en: string }> = {
  low:    { az: 'Aşağı', en: 'Low' },
  medium: { az: 'Orta',  en: 'Medium' },
  high:   { az: 'Yüksək', en: 'High' },
};

export default function RiskMatrixTable({ data }: Props) {
  const { lang } = useLang();
  const [selected, setSelected] = useState<{ method: string; dim: string } | null>(null);

  const selectedCell = selected
    ? data.methods.find((m) => m.id === selected.method)?.cells[selected.dim]
    : null;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-av-blue text-white">
              <th className="px-4 py-3 text-left font-semibold text-xs min-w-44">
                {lang === 'az' ? 'Metod' : 'Method'}
              </th>
              {data.dimensions.map((dim) => (
                <th key={dim.id} className="px-3 py-3 text-center font-semibold text-xs min-w-28">
                  {lang === 'az' ? dim.labelAz : dim.labelEn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.methods.map((method, i) => (
              <tr key={method.id} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
                <td className="px-4 py-3 font-medium text-av-blue text-xs">
                  {lang === 'az' ? method.labelAz : method.labelEn}
                </td>
                {data.dimensions.map((dim) => {
                  const cell = method.cells[dim.id];
                  const isSelected = selected?.method === method.id && selected?.dim === dim.id;
                  return (
                    <td key={dim.id} className="px-3 py-3 text-center">
                      <button
                        onClick={() =>
                          setSelected(
                            isSelected ? null : { method: method.id, dim: dim.id }
                          )
                        }
                        className={`text-xs px-2 py-1 rounded-full border transition-all ${levelStyles[cell.level]} ${
                          isSelected ? 'ring-2 ring-av-blue ring-offset-1' : ''
                        }`}
                      >
                        {levelLabels[cell.level][lang]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {Object.entries(levelLabels).map(([level, labels]) => (
          <span key={level} className={`px-2.5 py-1 rounded-full ${levelStyles[level]}`}>
            {labels[lang]}
          </span>
        ))}
        <span className="text-tech-gray self-center italic">
          {lang === 'az' ? '← Ətraflı məlumat üçün xanaya toxunun' : '← Click any cell for details'}
        </span>
      </div>

      {/* Detail panel */}
      {selected && selectedCell && (
        <div className="p-4 bg-surface border border-border rounded-xl text-sm">
          <p className="text-av-blue font-semibold mb-1">
            {lang === 'az' ? selectedCell.noteAz : selectedCell.noteEn}
          </p>
        </div>
      )}
    </div>
  );
}
