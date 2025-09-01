import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn("w-full bg-secondary rounded-full h-2", className)}>
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
        data-testid="progress-fill"
      />
    </div>
  );
}
