import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  role: varchar("role").notNull(), // 'admin', 'teacher', 'student', 'parent'
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  password: text("password").notNull(),
  // Role-specific fields
  employeeId: text("employee_id"),
  studentId: text("student_id"),
  parentRelation: text("parent_relation"), // 'father', 'mother', 'guardian'
  department: text("department"), // for teachers
  class: text("class"), // for students
  section: text("section"), // for students
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users)
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
  .refine((data) => {
    // Role-specific validation
    switch (data.role) {
      case 'admin':
        return data.employeeId && data.employeeId.trim() !== '';
      case 'teacher':
        return data.employeeId && data.employeeId.trim() !== '' &&
               data.department && data.department.trim() !== '';
      case 'student':
        return data.studentId && data.studentId.trim() !== '' &&
               data.class && data.class.trim() !== '' &&
               data.section && data.section.trim() !== '';
      case 'parent':
        return data.studentId && data.studentId.trim() !== '' &&
               data.parentRelation && data.parentRelation.trim() !== '';
      default:
        return false;
    }
  }, {
    message: "Missing required fields for the selected role",
  })
  .transform((data) => ({
    ...data,
    // Convert empty strings to null for optional fields
    phone: data.phone && data.phone.trim() !== '' ? data.phone : null,
    employeeId: data.employeeId && data.employeeId.trim() !== '' ? data.employeeId : null,
    studentId: data.studentId && data.studentId.trim() !== '' ? data.studentId : null,
    parentRelation: data.parentRelation && data.parentRelation.trim() !== '' ? data.parentRelation : null,
    department: data.department && data.department.trim() !== '' ? data.department : null,
    class: data.class && data.class.trim() !== '' ? data.class : null,
    section: data.section && data.section.trim() !== '' ? data.section : null,
  }));

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
