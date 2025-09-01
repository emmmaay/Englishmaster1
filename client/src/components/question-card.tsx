import { Question } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
}

export function QuestionCard({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onSelectAnswer, 
  disabled = false 
}: QuestionCardProps) {
  const options: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

  return (
    <Card className="w-full shadow-lg border border-border">
      <CardContent className="p-8">
        {/* Question */}
        <div className="mb-8">
          <div className="flex items-start space-x-3 mb-4">
            <Badge 
              variant="default" 
              className="rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1"
            >
              {questionNumber}
            </Badge>
            <div className="flex-1">
              <p 
                className="text-lg text-foreground leading-relaxed"
                data-testid="question-text"
              >
                {question.question}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => onSelectAnswer(option)}
              disabled={disabled}
              variant="outline"
              className={cn(
                "w-full text-left p-4 h-auto justify-start transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent hover:-translate-y-0.5",
                selectedAnswer === option && "bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground",
                disabled && "opacity-60 pointer-events-none"
              )}
              data-testid={`option-${option}`}
            >
              <div className="flex items-center space-x-3">
                <Badge 
                  variant={selectedAnswer === option ? "secondary" : "outline"}
                  className={cn(
                    "rounded-full w-8 h-8 flex items-center justify-center font-semibold",
                    selectedAnswer === option && "bg-primary-foreground text-primary"
                  )}
                >
                  {option}
                </Badge>
                <span>{question.options[option]}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
