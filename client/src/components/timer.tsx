import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  timeLeft: number;
  totalTime?: number;
  className?: string;
}

export function Timer({ timeLeft, totalTime = 20, className }: TimerProps) {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    setShouldPulse(timeLeft <= 5 && timeLeft > 0);
  }, [timeLeft]);

  const progress = ((totalTime - timeLeft) / totalTime) * 360;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "w-12 h-12 rounded-full border-4 border-primary/20 flex items-center justify-center relative",
        shouldPulse && "animate-pulse"
      )}>
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary transition-transform duration-1000"
          style={{ transform: `rotate(${progress}deg)` }}
        />
        <span 
          className={cn(
            "text-lg font-bold text-primary",
            timeLeft <= 5 && "text-destructive"
          )}
          data-testid="timer-display"
        >
          {timeLeft}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">seconds</span>
    </div>
  );
}
