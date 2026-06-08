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
      <h3 className="text-sm font-bold text-av-blue mb-4 flex items-center gap-2">
        <span>🎓</span>
        <span>{t({ az: 'Tədris Sualları', en: 'Study Questions' })}</span>
      </h3>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 px-4 py-3.5 bg-surface hover:bg-surface-alt transition-colors text-left"
            >
              <span className="text-amber font-bold text-sm shrink-0 mt-0.5">Q{i + 1}</span>
              <span className="text-sm text-foreground font-medium flex-1">
                {t({ az: q.questionAz, en: q.questionEn })}
              </span>
              <span className="text-tech-gray text-xs shrink-0 self-center">
                {revealed.has(i)
                  ? t({ az: 'Gizlət', en: 'Hide' })
                  : t({ az: 'Cavabı göstər', en: 'Show answer' })}
              </span>
            </button>
            {revealed.has(i) && (
              <div className="px-4 py-3.5 border-t border-border bg-white">
                <div className="flex gap-3">
                  <span className="text-reg-green font-bold text-sm shrink-0 mt-0.5">A</span>
                  <p className="text-sm text-foreground leading-relaxed">
                    {t({ az: q.answerAz, en: q.answerEn })}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
