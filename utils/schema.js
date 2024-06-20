import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable("interviews", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("json_mock_resp").notNull(),
  jobPosition: varchar("job_position").notNull(),
  jobDesc: varchar("job_desc").notNull(),
  jobExperience: varchar("job_experience").notNull(),
  createdBy: varchar("created_by").notNull(),
  createdAt: varchar("created_at").notNull(),
  mockInterviewId: varchar("mock_interview_id").notNull(),
});

export const UserAnswer = pgTable("user_answers", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mock_id_ref").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: varchar("correct_answer"),
  userAnswer: varchar("user_answer").notNull(),
  feedback: varchar("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("user_email"),
  createdAt: varchar("created_at"),
});
