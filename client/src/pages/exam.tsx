import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer } from '@/components/timer';
import { ProgressBar } from '@/components/progress-bar';
import { QuestionCard } from '@/components/question-card';
import { ExamState } from '@/hooks/use-exam';

interface ExamPageProps {
  examState: ExamState;
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onEndExam: () => void;
}

export function ExamPage({ 
  examState, 
  onSelectAnswer, 
  onNextQuestion, 
  onPreviousQuestion, 
  onEndExam 
}: ExamPageProps) {
  const currentQuestion = examState.questions[examState.currentQuestionIndex];
  const selectedAnswer = examState.userAnswers[examState.currentQuestionIndex];
  const isTimerExpired = examState.timeLeft <= 0;
  const canGoPrevious = examState.currentQuestionIndex > 0;
  const canGoNext = examState.currentQuestionIndex < examState.questions.length - 1;

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-foreground">
                English Masters Exam
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Questions Answered:</span>
                <span className="font-semibold text-foreground" data-testid="questions-answered">
                  {Object.keys(examState.userAnswers).length}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Timer timeLeft={examState.timeLeft} />
              
              <Button 
                onClick={onEndExam}
                variant="destructive"
                data-testid="button-end-exam"
              >
                End Exam
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <ProgressBar 
              current={examState.currentQuestionIndex + 1} 
              total={examState.questions.length} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
          <QuestionCard
            question={currentQuestion}
            questionNumber={examState.currentQuestionIndex + 1}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={isTimerExpired}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              onClick={onPreviousQuestion}
              disabled={!canGoPrevious}
              variant="secondary"
              data-testid="button-previous"
            >
              ← Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge 
                variant={selectedAnswer ? "default" : "secondary"}
                data-testid="answer-status"
              >
                {selectedAnswer ? "Answered" : "Not Answered"}
              </Badge>
            </div>
            
            <Button 
              onClick={onNextQuestion}
              disabled={!canGoNext}
              data-testid="button-next"
            >
              Next →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
