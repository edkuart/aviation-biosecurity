'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { href: '/',                      label: 'Home',                   icon: '🏠' },
  { href: '/regulatory-framework',  label: 'Regulatory Framework',   icon: '⚖️' },
  { href: '/biological-hazards',    label: 'Biological Hazards',     icon: '🦠' },
  { href: '/cabin-air-quality',     label: 'Cabin Air Quality',      icon: '💨' },
  { href: '/cleaning-sanitation',   label: 'Cleaning and Sanitation',icon: '🧹' },
  { href: '/ozone-sanitation',      label: 'Ozone Sanitation',       icon: '⚗️' },
  { href: '/corrosion-materials',   label: 'Corrosion and Materials',icon: '🔩' },
  { href: '/protective-coatings',   label: 'Protective Coatings',    icon: '🛡️' },
  { href: '/disinsection',          label: 'Disinsection',           icon: '🦟' },
  { href: '/uas-airport-safety',    label: 'UAS Airport Safety',     icon: '🚁' },
  { href: '/risk-matrix',           label: 'Risk Matrix',            icon: '📊' },
  { href: '/research-library',      label: 'Research Library',       icon: '📚' },
  { href: '/study-assistant',       label: 'Study Assistant',        icon: '💬' },
  { href: '/glossary',              label: 'Glossary',               icon: '📖' },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 hidden lg:flex flex-col bg-surface border-r border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
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
                className={`flex items-center gap-2.5 px-4 py-2 text-sm rounded-none transition-colors ${
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
    </nav>
  );
}
