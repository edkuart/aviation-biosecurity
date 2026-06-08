import type { StatusType } from '@/types/content';

export function statusConfig(status: StatusType) {
  const configs: Record<StatusType, { label: string; color: string; bg: string; icon: string }> = {
    confirmed: {
      label: 'Confirmed',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      icon: '✅',
    },
    'regulation-dependent': {
      label: 'Regulation-dependent',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      icon: '⚖',
    },
    'guidance-only': {
      label: 'Guidance only',
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      icon: '📖',
    },
    'needs-verification': {
      label: 'Needs verification',
      color: 'text-orange-700',
      bg: 'bg-orange-50 border-orange-200',
      icon: '⚠',
    },
  };
  return configs[status];
}

export function reliabilityConfig(level: number) {
  const colors = ['', 'bg-emerald-600', 'bg-emerald-500', 'bg-blue-500', 'bg-sky-500', 'bg-amber-500', 'bg-gray-400'];
  return colors[level] ?? 'bg-gray-400';
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
