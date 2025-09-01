import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get question bank (for future use if needed)
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
