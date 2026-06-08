'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getChatHistory,
  deleteChatSession,
  clearChatHistory,
  type ChatSession,
} from '@/lib/chat-history';

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('az-AZ', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 16).replace('T', ' ');
  }
}

function SessionCard({
  session,
  onDelete,
}: {
  session: ChatSession;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const userCount = session.messages.filter((m) => m.role === 'user').length;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      {/* Card header */}
      <div className="flex items-start gap-3 px-4 py-3">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex-1 text-left group"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-mono text-tech-gray">
              {formatDate(session.createdAt)}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-surface border border-border text-tech-gray font-mono uppercase">
              {session.lang}
            </span>
          </div>
          <p className="text-sm font-medium text-foreground group-hover:text-av-blue transition-colors line-clamp-2">
            {session.title}
          </p>
          <p className="text-xs text-tech-gray mt-0.5">
            {userCount} sual · {session.messages.length} mesaj
          </p>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-md text-tech-gray hover:bg-surface-alt transition-colors"
            title={expanded ? 'Bağla' : 'Aç'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => onDelete(session.id)}
            className="p-1.5 rounded-md text-tech-gray hover:bg-risk-red/10 hover:text-risk-red transition-colors"
            title="Sil"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded messages */}
      {expanded && (
        <div className="border-t border-border px-4 py-4 bg-surface space-y-3 max-h-96 overflow-y-auto">
          {session.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-av-blue text-white'
                    : 'bg-white border border-border text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChatHistoryClient() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setSessions(getChatHistory());
    setLoaded(true);
  }, []);

  function handleDelete(id: string) {
    deleteChatSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  function handleClearAll() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    clearChatHistory();
    setSessions([]);
    setConfirmClear(false);
  }

  if (!loaded) {
    return (
      <div className="text-center py-16 text-tech-gray text-sm">
        Yüklənir...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <span className="text-5xl opacity-30">🕐</span>
        <p className="text-tech-gray font-medium">Hələ söhbət yoxdur</p>
        <p className="text-sm text-tech-gray max-w-xs">
          Tədris köməkçisi ilə söhbət etdikdən sonra söhbətlər avtomatik
          saxlanılacaq.
        </p>
        <Link
          href="/study-assistant"
          className="mt-2 px-4 py-2 bg-av-blue text-white text-sm rounded-lg hover:bg-av-blue-light transition-colors"
        >
          Tədris Köməkçisinə get →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-tech-gray">
          {sessions.length} söhbət saxlanılıb
        </p>
        <button
          onClick={handleClearAll}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            confirmClear
              ? 'border-risk-red bg-risk-red text-white'
              : 'border-border text-tech-gray hover:border-risk-red hover:text-risk-red'
          }`}
        >
          {confirmClear ? 'Təsdiq et — hamısını sil' : 'Hamısını sil'}
        </button>
      </div>

      {/* Session list */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
