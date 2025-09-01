import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LandingPageProps {
  onStartExam: () => void;
}

export function LandingPage({ onStartExam }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-lg border border-border">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                English Masters Examination
              </h1>
              <p className="text-muted-foreground text-lg">
                Test your knowledge with our comprehensive CBT platform
              </p>
            </div>
            
            <Card className="bg-secondary mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-secondary-foreground">
                  Examination Instructions
                </h2>
                <ul className="text-left space-y-2 text-secondary-foreground">
                  <li className="flex items-start">
                    <Badge className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      1
                    </Badge>
                    <span>You have <strong>20 seconds</strong> to answer each question</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      2
                    </Badge>
                    <span>Questions are randomly selected from our question bank</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      3
                    </Badge>
                    <span>You can navigate back to review and change your answers</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      4
                    </Badge>
                    <span>Timer locks out the question when it reaches zero</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      5
                    </Badge>
                    <span>Click "End Exam" when you're finished to see your results</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-accent">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-accent-foreground">Questions Available</div>
                </CardContent>
              </Card>
              <Card className="bg-accent">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">20s</div>
                  <div className="text-sm text-accent-foreground">Per Question</div>
                </CardContent>
              </Card>
              <Card className="bg-accent">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-accent-foreground">Practice Sessions</div>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={onStartExam}
              size="lg"
              className="px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg"
              data-testid="button-start-exam"
            >
              Start Examination
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
