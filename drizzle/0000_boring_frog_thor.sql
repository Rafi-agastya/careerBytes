CREATE TABLE "trending_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill_name" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"popularity_score" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
