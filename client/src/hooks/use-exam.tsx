import { useState, useEffect, useCallback, useRef } from 'react';
import { Question, ExamResult } from '@shared/schema';
import { questionBank } from '@/data/questions';

export interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  questionTimers: Record<number, number>;
  isExamActive: boolean;
  timeLeft: number;
  startTime: Date | null;
  endTime: Date | null;
}

export function useExam() {
  const [examState, setExamState] = useState<ExamState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    questionTimers: {},
    isExamActive: false,
    timeLeft: 20,
    startTime: null,
    endTime: null,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shuffleQuestions = useCallback(() => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled;
  }, []);

  const startExam = useCallback(() => {
    const shuffledQuestions = shuffleQuestions();
    const initialTimers: Record<number, number> = {};
    
    shuffledQuestions.forEach((_, index) => {
      initialTimers[index] = 20;
    });

    setExamState({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      userAnswers: {},
      questionTimers: initialTimers,
      isExamActive: true,
      timeLeft: 20,
      startTime: new Date(),
      endTime: null,
    });
  }, [shuffleQuestions]);

  const endExam = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setExamState(prev => ({
      ...prev,
      isExamActive: false,
      endTime: new Date(),
    }));
  }, []);

  const selectAnswer = useCallback((answer: 'A' | 'B' | 'C' | 'D') => {
    if (examState.timeLeft <= 0 || !examState.isExamActive) return;

    setExamState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [prev.currentQuestionIndex]: answer,
      },
    }));
  }, [examState.timeLeft, examState.isExamActive]);

  const goToQuestion = useCallback((index: number) => {
    if (index < 0 || index >= examState.questions.length) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setExamState(prev => ({
      ...prev,
      currentQuestionIndex: index,
      timeLeft: prev.questionTimers[index],
    }));
  }, [examState.questions.length]);

  const nextQuestion = useCallback(() => {
    goToQuestion(examState.currentQuestionIndex + 1);
  }, [examState.currentQuestionIndex, goToQuestion]);

  const previousQuestion = useCallback(() => {
    goToQuestion(examState.currentQuestionIndex - 1);
  }, [examState.currentQuestionIndex, goToQuestion]);

  const calculateResults = useCallback((): ExamResult => {
    const totalQuestions = examState.questions.length;
    const questionsAnswered = Object.keys(examState.userAnswers).length;
    let correctAnswers = 0;

    examState.questions.forEach((question, index) => {
      const userAnswer = examState.userAnswers[index];
      if (userAnswer && userAnswer === question.correct) {
        correctAnswers++;
      }
    });

    const incorrectAnswers = questionsAnswered - correctAnswers;
    const percentage = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;
    
    const timeTaken = examState.startTime && examState.endTime 
      ? Math.floor((examState.endTime.getTime() - examState.startTime.getTime()) / 1000)
      : 0;

    return {
      totalQuestions,
      questionsAnswered,
      correctAnswers,
      incorrectAnswers,
      percentage,
      timeTaken,
    };
  }, [examState]);

  // Timer effect
  useEffect(() => {
    if (!examState.isExamActive) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setExamState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        const newTimers = {
          ...prev.questionTimers,
          [prev.currentQuestionIndex]: newTimeLeft,
        };

        return {
          ...prev,
          timeLeft: newTimeLeft,
          questionTimers: newTimers,
        };
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [examState.isExamActive, examState.currentQuestionIndex]);

  // Stop timer when time reaches 0
  useEffect(() => {
    if (examState.timeLeft <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [examState.timeLeft]);

  const resetExam = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setExamState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: {},
      questionTimers: {},
      isExamActive: false,
      timeLeft: 20,
      startTime: null,
      endTime: null,
    });
  }, []);

  return {
    examState,
    startExam,
    endExam,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    calculateResults,
    resetExam,
  };
}
