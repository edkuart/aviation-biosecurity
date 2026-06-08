'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang, Bilingual } from '@/types/content';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (s: Bilingual) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'az',
  setLang: () => {},
  t: (s) => s.az,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('az');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'az' || stored === 'en') setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('lang', l);
  }

  function t(s: Bilingual): string {
    return s[lang];
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
