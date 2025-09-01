import { Question } from "@shared/schema";
import { questionBank } from "../client/src/data/questions";

// Interface for storage operations
export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  getRandomQuestions(count: number): Promise<Question[]>;
}

export class MemStorage implements IStorage {
  private questions: Question[];

  constructor() {
    this.questions = [...questionBank];
  }

  async getAllQuestions(): Promise<Question[]> {
    return [...this.questions];
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.find(question => question.id === id);
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}

export const storage = new MemStorage();
