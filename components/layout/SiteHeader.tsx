'use client';

import Link from 'next/link';
import { useLang } from '@/lib/language';
import { useSidebar } from '@/lib/sidebar-context';

export default function SiteHeader() {
  const { lang, setLang } = useLang();
  const { open, toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-50 bg-av-blue border-b border-av-blue-light shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Left: hamburger (mobile/tablet) + logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger — only on < lg */}
          <button
            onClick={toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 rounded-md hover:bg-white/10 transition-colors shrink-0"
          >
            <span
              className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-200 ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-200 ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-semibold text-sm shrink-0"
          >
            <span className="text-amber text-lg">✈</span>
            <span className="hidden sm:inline">Aviation Biosecurity Platform</span>
            <span className="sm:hidden">AvBio</span>
          </Link>
        </div>

        {/* Right: language toggle + sources link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-av-blue-light rounded-full overflow-hidden text-xs font-medium">
            <button
              onClick={() => setLang('az')}
              className={`px-3 py-1 transition-colors ${
                lang === 'az'
                  ? 'bg-amber text-av-blue-dark'
                  : 'bg-transparent text-white/80 hover:text-white'
              }`}
              aria-pressed={lang === 'az'}
            >
              AZ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 transition-colors ${
                lang === 'en'
                  ? 'bg-amber text-av-blue-dark'
                  : 'bg-transparent text-white/80 hover:text-white'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          <Link
            href="/research-library"
            className="hidden md:inline-flex items-center gap-1 text-white/80 hover:text-white text-xs transition-colors"
          >
            <span>📚</span>
            <span>Sources</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
