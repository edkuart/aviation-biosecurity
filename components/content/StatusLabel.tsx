import type { StatusType } from '@/types/content';
import { statusConfig } from '@/lib/utils';

interface Props {
  status: StatusType;
  note?: string;
}

export default function StatusLabel({ status, note }: Props) {
  const cfg = statusConfig(status);
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}
      title={note}
    >
      <span>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </span>
  );
}
