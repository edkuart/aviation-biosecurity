'use client';

import { useState } from 'react';
import { useLang } from '@/lib/language';
import { getQABank } from '@/lib/content';

export default function StudyChatPlaceholder() {
  const { lang, t } = useLang();
  const qaBank = getQABank();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; sources?: string[] }[]
  >([]);

  function handleSend() {
    const query = input.trim();
    if (!query) return;

    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setInput('');

    const lower = query.toLowerCase();
    const match = qaBank.find((qa) => {
      const tags = lang === 'az' ? qa.tagsAz : qa.tagsEn;
      return tags.some((tag) => lower.includes(tag.toLowerCase()));
    });

    const answer = match
      ? (lang === 'az' ? match.answerAz : match.answerEn)
      : t({
          az: 'Bu mövzu üçün hazır cavab tapılmadı. Zəhmət olmasa, mövzu bölmələrini birbaşa araşdırın. (Gələcəkdə AI əlavə olunacaq.)',
          en: 'No prepared answer found for this topic. Please explore the topic sections directly. (AI integration coming soon.)',
        });

    const sources = match?.sourceIds;

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: answer, sources }]);
    }, 400);
  }

  const suggested = qaBank.slice(0, 5).map((qa) =>
    lang === 'az' ? qa.questionAz : qa.questionEn
  );

  return (
    <div className="flex flex-col bg-white border border-border rounded-xl overflow-hidden h-[500px]">
      {/* Header */}
      <div className="px-4 py-3 bg-av-blue text-white flex items-center gap-2 shrink-0">
        <span className="text-amber text-lg">💬</span>
        <div>
          <p className="text-sm font-semibold">
            {t({ az: 'Tədris Köməkçisi', en: 'Study Assistant' })}
          </p>
          <p className="text-xs text-white/70">
            {t({ az: 'Statik rejim · AI tezliklə', en: 'Static mode · AI coming soon' })}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-tech-gray">
              {t({
                az: 'Aşağıdakı nümunə suallardan birini seçin:',
                en: 'Try one of these example questions:',
              })}
            </p>
            <div className="flex flex-col gap-1.5">
              {suggested.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="text-left text-xs px-3 py-2 rounded-lg bg-surface hover:bg-surface-alt border border-border text-av-blue transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-av-blue text-white'
                  : 'bg-surface border border-border text-foreground'
              }`}
            >
              <p>{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <p className="mt-2 text-[10px] opacity-70">
                  {t({ az: 'Mənbə:', en: 'Source:' })} {msg.sources.join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border bg-surface shrink-0 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t({
            az: 'Sual yazın... (AZ/EN)',
            en: 'Ask a question... (AZ/EN)',
          })}
          className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:border-av-blue transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="text-xs px-3 py-2 rounded-lg bg-av-blue text-white disabled:opacity-40 hover:bg-av-blue-light transition-colors"
        >
          {t({ az: 'Göndər', en: 'Send' })}
        </button>
      </div>
    </div>
  );
}
