import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { ExamResult } from '@shared/schema';

interface ResultsPageProps {
  results: ExamResult;
  onRestartExam: () => void;
  onGoHome: () => void;
}

export function ResultsPage({ results, onRestartExam, onGoHome }: ResultsPageProps) {
  const accuracyRate = results.questionsAnswered > 0 
    ? Math.round((results.correctAnswers / results.questionsAnswered) * 100)
    : 0;
    
  const attemptRate = Math.round((results.questionsAnswered / results.totalQuestions) * 100);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="shadow-lg border border-border">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Examination Complete!
              </h1>
              <p className="text-muted-foreground">Here are your results</p>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div 
                    className="text-3xl font-bold text-primary mb-2"
                    data-testid="total-score"
                  >
                    {results.percentage}%
                  </div>
                  <div className="text-sm text-primary font-medium">Overall Score</div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent">
                <CardContent className="p-6 text-center">
                  <div 
                    className="text-3xl font-bold text-accent-foreground mb-2"
                    data-testid="total-answered"
                  >
                    {results.questionsAnswered}
                  </div>
                  <div className="text-sm text-accent-foreground">Questions Answered</div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div 
                    className="text-3xl font-bold text-green-600 mb-2"
                    data-testid="correct-answers"
                  >
                    {results.correctAnswers}
                  </div>
                  <div className="text-sm text-green-600 font-medium">Correct</div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <div 
                    className="text-3xl font-bold text-red-600 mb-2"
                    data-testid="incorrect-answers"
                  >
                    {results.incorrectAnswers}
                  </div>
                  <div className="text-sm text-red-600 font-medium">Incorrect</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Breakdown */}
            <Card className="bg-secondary mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-secondary-foreground">
                  Performance Analysis
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-foreground">Accuracy Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-background rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full transition-all duration-300"
                          style={{ width: `${accuracyRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-secondary-foreground">
                        {accuracyRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-foreground">Questions Attempted</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-background rounded-full h-3">
                        <div 
                          className="bg-accent-foreground h-3 rounded-full transition-all duration-300"
                          style={{ width: `${attemptRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-secondary-foreground">
                        {attemptRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-foreground">Time Taken</span>
                    <Badge variant="outline">
                      {formatTime(results.timeTaken)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onRestartExam}
                size="lg"
                className="px-8 py-3 font-semibold"
                data-testid="button-restart-exam"
              >
                Take Another Exam
              </Button>
              
              <Button 
                onClick={onGoHome}
                variant="outline"
                size="lg"
                className="px-8 py-3 font-semibold"
                data-testid="button-go-home"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
