import { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useExam } from '@/hooks/use-exam';
import { LandingPage } from '@/pages/landing';
import { ExamPage } from '@/pages/exam';
import { ResultsPage } from '@/pages/results';

type AppState = 'landing' | 'exam' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const {
    examState,
    startExam,
    endExam,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    calculateResults,
    resetExam,
  } = useExam();

  const handleStartExam = () => {
    startExam();
    setAppState('exam');
  };

  const handleEndExam = () => {
    endExam();
    setAppState('results');
  };

  const handleRestartExam = () => {
    resetExam();
    setAppState('landing');
  };

  const handleGoHome = () => {
    resetExam();
    setAppState('landing');
  };

  const results = calculateResults();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        
        {appState === 'landing' && (
          <LandingPage onStartExam={handleStartExam} />
        )}
        
        {appState === 'exam' && (
          <ExamPage
            examState={examState}
            onSelectAnswer={selectAnswer}
            onNextQuestion={nextQuestion}
            onPreviousQuestion={previousQuestion}
            onEndExam={handleEndExam}
          />
        )}
        
        {appState === 'results' && (
          <ResultsPage
            results={results}
            onRestartExam={handleRestartExam}
            onGoHome={handleGoHome}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
