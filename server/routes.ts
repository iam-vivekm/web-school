import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Signup endpoint
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Try to create user - database will handle unique constraint
      const user = await storage.createUser(userData);
      // Don't send password back to client
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint') || error.message?.includes('already exists')) {
        res.status(400).json({ message: "User with this email already exists" });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    }
  });

  // Signin endpoint
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Don't send password back to client
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get current user endpoint (for session validation)
  app.get("/api/auth/me", async (req, res) => {
    // This would typically use session/cookie validation
    // For now, we'll just return a placeholder
    res.json({ message: "Session validation endpoint" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
