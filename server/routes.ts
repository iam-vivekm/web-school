import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAttendanceSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Signup endpoint
  app.post("/api/auth/signup", async (req, res) => {
    try {
      console.log("Received signup request:", req.body);
      const userData = insertUserSchema.parse(req.body);
      console.log("Parsed user data:", userData);

      // Try to create user - database will handle unique constraint
      const user = await storage.createUser(userData);
      console.log("Created user:", user);
      // Don't send password back to client
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("Signup error:", error);
      console.error("Error details:", error.message);
      if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint') || error.message?.includes('already exists')) {
        res.status(400).json({ message: "User with this email already exists" });
      } else {
        res.status(400).json({ message: "Invalid user data: " + error.message });
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

  // Verify user exists endpoint
  app.get("/api/auth/verify/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);

      if (user) {
        res.json({ exists: true });
      } else {
        res.status(404).json({ exists: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Verify user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Attendance routes
  // GET /api/attendance - Get attendance records with filters
  app.get("/api/attendance", async (req, res) => {
    try {
      const { date, class: classFilter, studentId, teacherId } = req.query;
      const filters: any = {};

      if (typeof date === 'string') filters.date = date;
      if (typeof classFilter === 'string') filters.class = classFilter;
      if (typeof studentId === 'string') filters.studentId = studentId;
      if (typeof teacherId === 'string') filters.teacherId = teacherId;

      const attendance = await storage.getAttendance(filters);
      res.json(attendance);
    } catch (error) {
      console.error("Get attendance error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/attendance/mark - Mark attendance for multiple students
  app.post("/api/attendance/mark", async (req, res) => {
    try {
      const attendanceData = req.body;

      if (!Array.isArray(attendanceData)) {
        return res.status(400).json({ message: "Attendance data must be an array" });
      }

      console.log("Received attendance data:", attendanceData);

      // Validate each attendance record
      const validatedData = attendanceData.map(data => insertAttendanceSchema.parse(data));

      console.log("Validated attendance data:", validatedData);

      // Verify that the markedBy user exists
      if (validatedData.length > 0) {
        const markedByUser = await storage.getUser(validatedData[0].markedBy);
        if (!markedByUser) {
          console.error("User not found for markedBy:", validatedData[0].markedBy);
          return res.status(400).json({ message: "Invalid attendance data: Teacher user not found" });
        }
        console.log("Verified teacher user exists:", markedByUser);
      }

      const result = await storage.markAttendance(validatedData);
      console.log("Attendance marked successfully:", result);
      res.status(201).json(result);
    } catch (error: any) {
      console.error("Mark attendance error:", error);
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
      res.status(400).json({ message: "Invalid attendance data: " + error.message });
    }
  });

  // GET /api/attendance/student/:id - Get attendance for specific student
  app.get("/api/attendance/student/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;

      const attendance = await storage.getAttendanceByStudent(
        id,
        typeof startDate === 'string' ? startDate : undefined,
        typeof endDate === 'string' ? endDate : undefined
      );
      res.json(attendance);
    } catch (error) {
      console.error("Get student attendance error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/students/class/:class/:section - Get students for a specific class and section
  app.get("/api/students/class/:class/:section", async (req, res) => {
    try {
      console.log("API called: getStudentsByClass", req.params);
      const { class: className, section } = req.params;

      // Try to get students from database
      let students = await storage.getStudentsByClass(className, section);

      // If no students found, create some sample students for testing
      if (students.length === 0) {
        console.log("No students found, creating sample students for testing");

        const sampleStudents = [
          {
            role: "student" as const,
            firstName: "Aarav",
            lastName: "Sharma",
            email: `aarav.sharma.${className}${section}@school.com`,
            password: "password123",
            phone: null,
            employeeId: null,
            studentId: `STU${className}${section}001`,
            parentRelation: null,
            department: null,
            class: className,
            section: section
          },
          {
            role: "student" as const,
            firstName: "Priya",
            lastName: "Patel",
            email: `priya.patel.${className}${section}@school.com`,
            password: "password123",
            phone: null,
            employeeId: null,
            studentId: `STU${className}${section}002`,
            parentRelation: null,
            department: null,
            class: className,
            section: section
          },
          {
            role: "student" as const,
            firstName: "Rohan",
            lastName: "Kumar",
            email: `rohan.kumar.${className}${section}@school.com`,
            password: "password123",
            phone: null,
            employeeId: null,
            studentId: `STU${className}${section}003`,
            parentRelation: null,
            department: null,
            class: className,
            section: section
          },
          {
            role: "student" as const,
            firstName: "Sneha",
            lastName: "Singh",
            email: `sneha.singh.${className}${section}@school.com`,
            password: "password123",
            phone: null,
            employeeId: null,
            studentId: `STU${className}${section}004`,
            parentRelation: null,
            department: null,
            class: className,
            section: section
          },
          {
            role: "student" as const,
            firstName: "Vikram",
            lastName: "Gupta",
            email: `vikram.gupta.${className}${section}@school.com`,
            password: "password123",
            phone: null,
            employeeId: null,
            studentId: `STU${className}${section}005`,
            parentRelation: null,
            department: null,
            class: className,
            section: section
          }
        ];

        // Create the sample students
        for (const studentData of sampleStudents) {
          try {
            await storage.createUser(studentData);
          } catch (error) {
            // Ignore duplicate email errors
            console.log("Student may already exist:", studentData.email);
          }
        }

        // Fetch students again after creation
        students = await storage.getStudentsByClass(className, section);
      }

      console.log("Returning students:", students.length);
      res.json(students);
    } catch (error) {
      console.error("Get students by class error:", error);
      res.status(500).json({ message: "Internal server error: " + (error as Error).message });
    }
  });

  // GET /api/attendance/teacher/classes - Get classes available for teacher to mark attendance
  app.get("/api/attendance/teacher/classes", async (req, res) => {
    try {
      // In a real app, you'd get teacher ID from session/auth
      // For now, we'll use a query parameter
      const { teacherId } = req.query;

      if (!teacherId || typeof teacherId !== 'string') {
        return res.status(400).json({ message: "Teacher ID is required" });
      }

      const classes = await storage.getClassesForTeacher(teacherId);
      res.json(classes);
    } catch (error) {
      console.error("Get teacher classes error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/attendance/class/:class/:section - Get attendance for specific class/section
  app.get("/api/attendance/class/:class/:section", async (req, res) => {
    try {
      const { class: className, section } = req.params;
      const { date } = req.query;

      const attendance = await storage.getAttendanceByClass(
        className,
        section,
        typeof date === 'string' ? date : undefined
      );
      res.json(attendance);
    } catch (error) {
      console.error("Get class attendance error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
