import { Star } from 'lucide-react';

import { cn } from '@/lib/cn';

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
  showNumber?: boolean;
  reviewCount?: number;
}

export function Stars({ rating, size = 14, className, showNumber, reviewCount }: StarsProps) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.floor(rounded);
          const half = !filled && i - 0.5 === rounded;
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={cn(
                filled ? 'fill-flame text-flame' : 'text-flame',
                !filled && !half && 'opacity-30',
              )}
              style={half ? { fill: 'url(#halfGradient)' } : undefined}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-medium text-muted">
          {rating.toFixed(1)}
          {typeof reviewCount === 'number' && (
            <span className="ml-1 text-ink/40">({reviewCount.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}
