import type { StatusType } from '@/types/content';

export function statusConfig(status: StatusType) {
  const configs: Record<StatusType, { label: string; color: string; bg: string; icon: string }> = {
    confirmed: {
      label: 'Confirmed',
      color: 'text-confirm-green',
      bg: 'bg-confirm-green-bg border-confirm-green/30',
      icon: '✅',
    },
    'regulation-dependent': {
      label: 'Regulation-dependent',
      color: 'text-info-blue',
      bg: 'bg-info-blue-bg border-info-blue/30',
      icon: '⚖',
    },
    'guidance-only': {
      label: 'Guidance only',
      color: 'text-warn-amber',
      bg: 'bg-warn-amber-bg border-warn-amber/30',
      icon: '📖',
    },
    'needs-verification': {
      label: 'Needs verification',
      color: 'text-risk-red',
      bg: 'bg-risk-red-bg border-risk-red/30',
      icon: '⚠',
    },
  };
  return configs[status];
}

export function reliabilityConfig(level: number) {
  const colors = ['', 'bg-confirm-green', 'bg-confirm-green', 'bg-av-blue', 'bg-info-blue', 'bg-warn-amber', 'bg-tech-gray'];
  return colors[level] ?? 'bg-tech-gray';
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
