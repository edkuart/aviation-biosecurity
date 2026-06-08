'use client';

import { useRef, useState } from 'react';
import { useLang } from '@/lib/language';
import { getQABank } from '@/lib/content';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  streaming?: boolean;
};

export default function StudyChatPlaceholder() {
  const { lang, t } = useLang();
  const qaBank = getQABank();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSend() {
    const query = input.trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setInput('');
    setLoading(true);

    // Add empty assistant message that will be streamed into
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: '', streaming: true },
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, lang }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === 'assistant') {
              updated[updated.length - 1] = {
                ...last,
                text: last.text + chunk,
              };
            }
            return updated;
          });
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Mark streaming done
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant') {
          updated[updated.length - 1] = { ...last, streaming: false };
        }
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant') {
          updated[updated.length - 1] = {
            role: 'assistant',
            text: t({
              az: 'Xəta baş verdi. Bir az sonra yenidən cəhd edin.',
              en: 'An error occurred. Please try again shortly.',
            }),
            streaming: false,
          };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  const suggested = qaBank.slice(0, 5).map((qa) =>
    lang === 'az' ? qa.questionAz : qa.questionEn
  );

  return (
    <div className="flex flex-col bg-white border border-border rounded-xl overflow-hidden h-[520px]">
      {/* Header */}
      <div className="px-4 py-3 bg-av-blue text-white flex items-center gap-2 shrink-0">
        <span className="text-lg">💬</span>
        <div className="flex-1">
          <p className="text-sm font-semibold">
            {t({ az: 'Tədris Köməkçisi', en: 'Study Assistant' })}
          </p>
          <p className="text-xs text-white/70">
            Claude Haiku · Aviasiya Biosəlamatlığı
          </p>
        </div>
        <span className="text-xs text-emerald-300 font-mono">AI ●</span>
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
              {msg.text ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <span className="inline-flex gap-1 items-center text-tech-gray">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse delay-75">●</span>
                  <span className="animate-pulse delay-150">●</span>
                </span>
              )}
              {msg.streaming && msg.text && (
                <span className="inline-block w-1 h-3 ml-0.5 bg-av-blue animate-pulse align-middle" />
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border bg-surface shrink-0 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          placeholder={t({
            az: 'Sual yazın... (AZ/EN)',
            en: 'Ask a question... (AZ/EN)',
          })}
          className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:border-av-blue transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="text-xs px-3 py-2 rounded-lg bg-av-blue text-white disabled:opacity-40 hover:bg-av-blue-light transition-colors"
        >
          {loading
            ? t({ az: '...', en: '...' })
            : t({ az: 'Göndər', en: 'Send' })}
        </button>
      </div>
    </div>
  );
}
