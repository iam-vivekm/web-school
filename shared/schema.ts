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

export const insertUserSchema = createInsertSchema(users).pick({
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
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
