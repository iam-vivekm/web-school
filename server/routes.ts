import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAttendanceSchema, users, attendance, insertInstituteSchema, institutes } from "@/shared/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { requireAdmin, requireTeacher } from "./middleware";

// Create partial schemas for updates
const updateUserSchema = createInsertSchema(users)
  .pick({
    role: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    password: true,
    employeeId: true,
    studentId: true,
    parentRelation: true,
    department: true,
    class: true,
    section: true,
  })
  .partial();

const updateAttendanceSchema = createInsertSchema(attendance)
  .pick({
    studentId: true,
    date: true,
    status: true,
    markedBy: true,
    subject: true,
    class: true,
    section: true,
  })
  .partial();

// Create a simple update schema for institutes (without complex transforms)
const updateInstituteSchema = z.object({
  name: z.string().optional(),
  shortName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  established: z.string().optional(),
  accreditation: z.string().optional(),
  principalName: z.string().optional(),
  principalEmail: z.string().optional(),
  motto: z.string().optional(),
  description: z.string().optional(),
  boardAffiliation: z.string().optional(),
  registrationNumber: z.string().optional(),
  studentCount: z.string().optional(),
  teacherCount: z.string().optional(),
  classCount: z.string().optional(),
}).transform((data) => {
  // Convert empty strings to null for optional fields
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === undefined ? undefined : (typeof value === 'string' && value.trim() === '' ? null : value)
    ])
  );
});

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

  // User CRUD routes
  // GET /api/users - Get users with optional role filter
  app.get("/api/users", requireAdmin, async (req, res) => {
    try {
      const { role } = req.query;
      let users;

      if (role && typeof role === 'string') {
        // Filter users by role
        const allUsers = await storage.getAllUsers();
        users = allUsers.filter(user => user.role === role);
      } else {
        users = await storage.getAllUsers();
      }

      // Don't send passwords back to client
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PUT /api/users/:id - Update user
  app.put("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;

      // Validate the update data (partial schema)
      const validatedData = updateUserSchema.parse(userData);

      const updatedUser = await storage.updateUser(id, validatedData);

      // Don't send password back to client
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error: any) {
      console.error("Update user error:", error);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(400).json({ message: "Invalid user data: " + error.message });
      }
    }
  });

  // DELETE /api/users/:id - Delete user
  app.delete("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;

      await storage.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Delete user error:", error);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Attendance CRUD routes
  // PUT /api/attendance/:id - Update attendance record
  app.put("/api/attendance/:id", requireTeacher, async (req, res) => {
    try {
      const { id } = req.params;
      const attendanceData = req.body;

      // Validate the update data (partial schema)
      const validatedData = updateAttendanceSchema.parse(attendanceData);

      const updatedAttendance = await storage.updateAttendance(id, validatedData);
      res.json(updatedAttendance);
    } catch (error: any) {
      console.error("Update attendance error:", error);
      if (error.message === "Attendance record not found") {
        res.status(404).json({ message: "Attendance record not found" });
      } else {
        res.status(400).json({ message: "Invalid attendance data: " + error.message });
      }
    }
  });

  // DELETE /api/attendance/:id - Delete attendance record
  app.delete("/api/attendance/:id", requireTeacher, async (req, res) => {
    try {
      const { id } = req.params;

      await storage.deleteAttendance(id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Delete attendance error:", error);
      if (error.message === "Attendance record not found") {
        res.status(404).json({ message: "Attendance record not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Institute routes
  // GET /api/institute/current - Get current institute data (create with demo if none exists)
  app.get("/api/institute/current", async (req, res) => {
    try {
      let institute = await storage.getCurrentInstitute();

      // If no institute exists, create one with demo data
      if (!institute) {
        console.log("No institute found, creating with demo data");
        institute = await storage.createInstituteWithDemoData();
        console.log("Created institute with demo data:", institute);
      }

      res.json(institute);
    } catch (error) {
      console.error("Get current institute error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PUT /api/institute/current - Update current institute data
  app.put("/api/institute/current", requireAdmin, async (req, res) => {
    try {
      const instituteData = req.body;

      // Validate the update data
      const validatedData = updateInstituteSchema.parse(instituteData);

      // Get current institute or create one if it doesn't exist
      let institute = await storage.getCurrentInstitute();
      if (!institute) {
        institute = await storage.createInstituteWithDemoData();
      }

      // Update the institute
      const updatedInstitute = await storage.updateInstitute(institute.id, validatedData);
      res.json(updatedInstitute);
    } catch (error: any) {
      console.error("Update institute error:", error);
      if (error.message === "Institute not found") {
        res.status(404).json({ message: "Institute not found" });
      } else {
        res.status(400).json({ message: "Invalid institute data: " + error.message });
      }
    }
  });

  // POST /api/institute/create - Create new institute (for multi-institute systems)
  app.post("/api/institute/create", requireAdmin, async (req, res) => {
    try {
      const instituteData = insertInstituteSchema.parse(req.body);
      const institute = await storage.createInstitute(instituteData);
      res.status(201).json(institute);
    } catch (error: any) {
      console.error("Create institute error:", error);
      res.status(400).json({ message: "Invalid institute data: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
