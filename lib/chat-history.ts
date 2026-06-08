export type SavedMessage = {
  role: 'user' | 'assistant';
  text: string;
};

export type ChatSession = {
  id: string;
  createdAt: string; // ISO
  title: string;     // first user message, truncated
  lang: 'az' | 'en';
  messages: SavedMessage[];
};

const KEY = 'avbio:chat_history';

export function getChatHistory(): ChatSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as ChatSession[]).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  } catch {
    return [];
  }
}

export function saveChatSession(session: ChatSession): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getChatHistory();
    const idx = all.findIndex((s) => s.id === session.id);
    if (idx >= 0) {
      all[idx] = session;
    } else {
      all.unshift(session);
    }
    localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)));
  } catch {}
}

export function deleteChatSession(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const filtered = getChatHistory().filter((s) => s.id !== id);
    localStorage.setItem(KEY, JSON.stringify(filtered));
  } catch {}
}

export function clearChatHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}

export function makeSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
