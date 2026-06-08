'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/lib/sidebar-context';

const sections = [
  { href: '/',                      label: 'Home',                    icon: '🏠' },
  { href: '/regulatory-framework',  label: 'Regulatory Framework',    icon: '⚖️' },
  { href: '/biological-hazards',    label: 'Biological Hazards',      icon: '🦠' },
  { href: '/cabin-air-quality',     label: 'Cabin Air Quality',       icon: '💨' },
  { href: '/cleaning-sanitation',   label: 'Cleaning and Sanitation', icon: '🧹' },
  { href: '/ozone-sanitation',      label: 'Ozone Sanitation',        icon: '⚗️' },
  { href: '/corrosion-materials',   label: 'Corrosion and Materials', icon: '🔩' },
  { href: '/protective-coatings',   label: 'Protective Coatings',     icon: '🛡️' },
  { href: '/disinsection',          label: 'Disinsection',            icon: '🦟' },
  { href: '/uas-airport-safety',    label: 'UAS Airport Safety',      icon: '🚁' },
  { href: '/risk-matrix',           label: 'Risk Matrix',             icon: '📊' },
  { href: '/research-library',      label: 'Research Library',        icon: '📚' },
  { href: '/study-assistant',       label: 'Study Assistant',         icon: '💬' },
  { href: '/chat-history',          label: 'Chat History',            icon: '🕐' },
  { href: '/glossary',              label: 'Glossary',                icon: '📖' },
];

function NavList({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <p className="px-4 text-xs font-semibold uppercase tracking-wider text-tech-gray mb-2">
        Sections
      </p>
      <ul className="space-y-0.5">
        {sections.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onLinkClick}
                className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-av-blue text-white font-medium border-r-2 border-amber'
                    : 'text-tech-gray hover:bg-surface-alt hover:text-av-blue'
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function SidebarNav() {
  const { open, close } = useSidebar();

  return (
    <>
      {/* ── Desktop: always visible fixed sidebar ── */}
      <nav className="w-64 shrink-0 hidden lg:flex flex-col bg-surface border-r border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
        <NavList />
      </nav>

      {/* ── Mobile/tablet: backdrop ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile/tablet: drawer ── */}
      <nav
        className={`lg:hidden fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-72 bg-surface border-r border-border flex flex-col py-4 overflow-y-auto shadow-xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation menu"
      >
        {/* Close button inside drawer */}
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1.5 rounded-md text-tech-gray hover:bg-surface-alt hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <NavList onLinkClick={close} />
      </nav>
    </>
  );
}
