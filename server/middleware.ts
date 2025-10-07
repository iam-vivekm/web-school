import type { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

// Middleware to require admin role
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    // In a real application, you'd get the user ID from session/token
    // For now, we'll expect it in the request headers for simplicity
    const userId = req.headers['x-user-id'] as string;

    console.log("requireAdmin middleware - userId:", userId);

    if (!userId) {
      console.log("requireAdmin middleware - no userId in headers");
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await storage.getUser(userId);
    console.log("requireAdmin middleware - user found:", user ? { id: user.id, role: user.role, email: user.email } : null);

    if (!user) {
      console.log("requireAdmin middleware - user not found in database");
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Add user to request object for use in route handlers
    (req as any).user = user;
    console.log("requireAdmin middleware - access granted for user");
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Middleware to require teacher role
export async function requireTeacher(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await storage.getUser(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== 'teacher' && user.role !== 'admin') {
      return res.status(403).json({ message: "Teacher or admin access required" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Teacher middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
