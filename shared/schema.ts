import { z } from "zod";

export const questionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.object({
    A: z.string(),
    B: z.string(),
    C: z.string(),
    D: z.string(),
  }),
  correct: z.enum(['A', 'B', 'C', 'D']),
  chapter: z.number().optional(),
});

export const examSessionSchema = z.object({
  id: z.string(),
  questions: z.array(questionSchema),
  userAnswers: z.record(z.string(), z.enum(['A', 'B', 'C', 'D'])),
  questionTimers: z.record(z.string(), z.number()),
  currentQuestionIndex: z.number(),
  startTime: z.date(),
  endTime: z.date().optional(),
});

export const examResultSchema = z.object({
  totalQuestions: z.number(),
  questionsAnswered: z.number(),
  correctAnswers: z.number(),
  incorrectAnswers: z.number(),
  percentage: z.number(),
  timeTaken: z.number(), // in seconds
});

export type Question = z.infer<typeof questionSchema>;
export type ExamSession = z.infer<typeof examSessionSchema>;
export type ExamResult = z.infer<typeof examResultSchema>;
