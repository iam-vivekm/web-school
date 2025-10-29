import { type User, type InsertUser, users, type Attendance, type InsertAttendance, attendance, type Institute, type InsertInstitute, institutes } from "../shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  getStudentsByClass(className: string, section: string): Promise<User[]>;

  // Attendance methods
  getAttendance(filters?: { date?: string; class?: string; studentId?: string; teacherId?: string }): Promise<Attendance[]>;
  markAttendance(attendanceData: InsertAttendance[]): Promise<Attendance[]>;
  updateAttendance(id: string, attendance: Partial<InsertAttendance>): Promise<Attendance>;
  deleteAttendance(id: string): Promise<void>;
  getAttendanceByStudent(studentId: string, startDate?: string, endDate?: string): Promise<Attendance[]>;
  getAttendanceByClass(className: string, section: string, date?: string): Promise<Attendance[]>;
  getClassesForTeacher(teacherId: string): Promise<{ class: string; section: string }[]>;

  // Institute methods
  getInstitute(id: string): Promise<Institute | undefined>;
  getCurrentInstitute(): Promise<Institute | undefined>;
  createInstitute(institute: InsertInstitute): Promise<Institute>;
  updateInstitute(id: string, institute: Partial<InsertInstitute>): Promise<Institute>;
  deleteInstitute(id: string): Promise<void>;
  createInstituteWithDemoData(): Promise<Institute>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User> {
    const result = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("User not found");
    }

    return result[0];
  }

  async deleteUser(id: string): Promise<void> {
    const result = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("User not found");
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getStudentsByClass(className: string, section: string): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(and(eq(users.class, className), eq(users.section, section), eq(users.role, 'student')));
  }

  // Attendance methods
  async getAttendance(filters?: { date?: string; class?: string; studentId?: string; teacherId?: string }): Promise<Attendance[]> {
    const conditions = [];

    if (filters?.date) {
      conditions.push(eq(attendance.date, filters.date));
    }
    if (filters?.class) {
      conditions.push(eq(attendance.class, filters.class));
    }
    if (filters?.studentId) {
      conditions.push(eq(attendance.studentId, filters.studentId));
    }
    if (filters?.teacherId) {
      conditions.push(eq(attendance.markedBy, filters.teacherId));
    }

    if (conditions.length > 0) {
      return await db.select().from(attendance).where(and(...conditions));
    }

    return await db.select().from(attendance);
  }

  async markAttendance(attendanceData: InsertAttendance[]): Promise<Attendance[]> {
    // Handle attendance marking with proper conflict resolution
    const results: Attendance[] = [];

    for (const record of attendanceData) {
      try {
        // Try to insert first
        const insertResult = await db
          .insert(attendance)
          .values(record)
          .returning();

        if (insertResult.length > 0) {
          results.push(...insertResult);
          continue;
        }
      } catch (error: any) {
        // If insert fails due to constraint violation, try update
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          const updateResult = await db
            .update(attendance)
            .set({
              status: record.status,
              markedBy: record.markedBy,
              subject: record.subject,
              class: record.class,
              section: record.section,
            })
            .where(and(
              eq(attendance.studentId, record.studentId),
              eq(attendance.date, record.date)
            ))
            .returning();

          results.push(...updateResult);
          continue;
        }
        throw error; // Re-throw if it's not a constraint violation
      }
    }

    return results;
  }

  async updateAttendance(id: string, attendanceData: Partial<InsertAttendance>): Promise<Attendance> {
    const result = await db
      .update(attendance)
      .set(attendanceData)
      .where(eq(attendance.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("Attendance record not found");
    }

    return result[0];
  }

  async deleteAttendance(id: string): Promise<void> {
    const result = await db
      .delete(attendance)
      .where(eq(attendance.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("Attendance record not found");
    }
  }

  async getAttendanceByStudent(studentId: string, startDate?: string, endDate?: string): Promise<Attendance[]> {
    const conditions = [eq(attendance.studentId, studentId)];

    if (startDate && endDate) {
      conditions.push(gte(attendance.date, startDate), lte(attendance.date, endDate));
    }

    return await db.select().from(attendance).where(and(...conditions)).orderBy(attendance.date);
  }

  async getAttendanceByClass(className: string, section: string, date?: string): Promise<Attendance[]> {
    const conditions = [eq(attendance.class, className), eq(attendance.section, section)];

    if (date) {
      conditions.push(eq(attendance.date, date));
    }

    return await db.select().from(attendance).where(and(...conditions));
  }

  async getClassesForTeacher(teacherId: string): Promise<{ class: string; section: string }[]> {
    // Get distinct class/section combinations from attendance records marked by this teacher
    const result = await db
      .selectDistinct({ class: attendance.class, section: attendance.section })
      .from(attendance)
      .where(eq(attendance.markedBy, teacherId));

    return result;
  }

  // Institute methods
  async getInstitute(id: string): Promise<Institute | undefined> {
    const result = await db.select().from(institutes).where(eq(institutes.id, id)).limit(1);
    return result[0];
  }

  async getCurrentInstitute(): Promise<Institute | undefined> {
    // For simplicity, return the first institute. In a multi-tenant system, you'd use context/user session
    const result = await db.select().from(institutes).limit(1);
    return result[0];
  }

  async createInstitute(institute: InsertInstitute): Promise<Institute> {
    const result = await db.insert(institutes).values(institute).returning();
    return result[0];
  }

  async updateInstitute(id: string, instituteData: Partial<InsertInstitute>): Promise<Institute> {
    const result = await db
      .update(institutes)
      .set(instituteData)
      .where(eq(institutes.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("Institute not found");
    }

    return result[0];
  }

  async deleteInstitute(id: string): Promise<void> {
    const result = await db
      .delete(institutes)
      .where(eq(institutes.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("Institute not found");
    }
  }

  async createInstituteWithDemoData(): Promise<Institute> {
    const demoData: InsertInstitute = {
      name: "Example International School",
      shortName: "EIS",
      address: "123 Education Lane, Academic City, State 12345",
      phone: "+1 (555) 123-4567",
      email: "info@example-school.edu",
      website: "https://www.example-school.edu",
      established: "1995",
      accreditation: "Regional Board of Education",
      principalName: "Dr. Sarah Johnson",
      principalEmail: "principal@example-school.edu",
      motto: "Excellence Through Learning",
      description: "A premier educational institution committed to nurturing young minds and fostering academic excellence.",
      boardAffiliation: "State Board of Education",
      registrationNumber: "SCH-REG-2024-001",
      studentCount: "1284",
      teacherCount: "85",
      classCount: "42"
    };

    const result = await db.insert(institutes).values(demoData).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
