import { type User, type InsertUser, users, type Attendance, type InsertAttendance, attendance } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
