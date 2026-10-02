import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type Tone = 'ink' | 'flame' | 'cream' | 'success';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneMap: Record<Tone, string> = {
  ink: 'bg-ink text-white',
  flame: 'bg-flame text-white',
  cream: 'bg-cream text-ink',
  success: 'bg-emerald-500 text-white',
};

export function Badge({ className, tone = 'ink', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
        toneMap[tone],
        className,
      )}
      {...props}
    />
  );
}
