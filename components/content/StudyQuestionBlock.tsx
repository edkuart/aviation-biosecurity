'use client';

import { useState } from 'react';
import { useLang } from '@/lib/language';
import type { StudyQuestion } from '@/types/content';

interface Props {
  questions: StudyQuestion[];
}

export default function StudyQuestionBlock({ questions }: Props) {
  const { t } = useLang();
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="mt-8">
      <h3 className="text-sm font-bold text-av-navy mb-4 flex items-center gap-2">
        <span>🎓</span>
        <span>{t({ az: 'Tədris Sualları', en: 'Study Questions' })}</span>
      </h3>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const open = revealed.has(i);
          return (
            <div key={i} className="border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-3 px-4 py-3.5 bg-white hover:bg-surface transition-colors text-left"
              >
                {/* Academic-gold Q number */}
                <span className="font-mono font-bold text-academic-gold text-sm shrink-0 mt-0.5">
                  Q{i + 1}
                </span>
                <span className="text-sm text-ink-soft font-medium flex-1">
                  {t({ az: q.questionAz, en: q.questionEn })}
                </span>
                <span className="text-tech-gray text-xs shrink-0 self-center">
                  {open
                    ? t({ az: 'Gizlət', en: 'Hide' })
                    : t({ az: 'Cavabı göstər', en: 'Show answer' })}
                </span>
              </button>

              {/* Animated answer reveal */}
              <div className={`expandable-grid${open ? ' open' : ''}`}>
                <div>
                  {/* Cream bg + green left border for answers */}
                  <div className="px-4 py-3.5 border-t border-border bg-academic-cream border-l-4 border-l-confirm-green">
                    <div className="flex gap-3">
                      <span className="font-mono font-bold text-confirm-green text-sm shrink-0 mt-0.5">A</span>
                      <p className="text-sm text-ink-soft leading-relaxed">
                        {t({ az: q.answerAz, en: q.answerEn })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
