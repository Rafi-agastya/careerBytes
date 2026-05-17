import { pgTable, serial, varchar, integer, timestamp, text, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: text('password'),
  googleId: varchar('google_id', { length: 255 }).unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const trendingSkills = pgTable('trending_skills', {
  id: serial('id').primaryKey(),
  skillName: varchar('skill_name', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  popularityScore: integer('popularity_score').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 🆕 Tabel roles
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id').notNull().references(() => roles.id),
  question: text('question').notNull(),
  options: jsonb('options').notNull(),
  correctAnswer: integer('correct_answer').notNull(),
  skillName: varchar('skill_name', { length: 100 }).notNull(),
  difficulty: varchar('difficulty', { length: 20 }).notNull(),
  explanation: text('explanation'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const quizResults = pgTable('quiz_results', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  roleId: integer('role_id').notNull().references(() => roles.id),
  overallMatch: integer('overall_match').notNull(),
  levelBadge: varchar('level_badge', { length: 20 }).notNull(),
  skillsAnalysis: jsonb('skills_analysis').notNull(),
  totalCorrect: integer('total_correct').default(0),
  totalIncorrect: integer('total_incorrect').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const quizAnswers = pgTable('quiz_answers', {
  id: serial('id').primaryKey(),
  resultId: integer('result_id').notNull().references(() => quizResults.id),
  questionId: integer('question_id').notNull().references(() => quizQuestions.id),
  selectedOption: integer('selected_option'),
  isCorrect: integer('is_correct'),
  createdAt: timestamp('created_at').defaultNow(),
});