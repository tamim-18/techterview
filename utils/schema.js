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
