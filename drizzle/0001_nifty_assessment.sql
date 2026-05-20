-- Migration: Convert skill assessment to multiple choice format
-- Old rating/essay questions → multiple choice, new scoring logic

TRUNCATE TABLE quiz_answers CASCADE;
TRUNCATE TABLE quiz_results CASCADE;
TRUNCATE TABLE quiz_questions CASCADE;

-- quiz_questions: add options, normalize correct_answer to integer, drop unused
ALTER TABLE quiz_questions ADD COLUMN options jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE quiz_questions DROP COLUMN correct_answer;
ALTER TABLE quiz_questions ADD COLUMN correct_answer integer NOT NULL DEFAULT 0;
ALTER TABLE quiz_questions DROP COLUMN question_type;
ALTER TABLE quiz_questions DROP COLUMN scenario;
ALTER TABLE quiz_questions DROP COLUMN hint;

-- quiz_answers: replace score/essay_answer with selected_option
ALTER TABLE quiz_answers ADD COLUMN selected_option integer;
ALTER TABLE quiz_answers DROP COLUMN score;
ALTER TABLE quiz_answers DROP COLUMN essay_answer;

-- quiz_results: new scoring columns, drop old ones
ALTER TABLE quiz_results ADD COLUMN overall_match integer NOT NULL DEFAULT 0;
ALTER TABLE quiz_results ADD COLUMN level_badge varchar(20) NOT NULL DEFAULT 'BEGINNER';
ALTER TABLE quiz_results ADD COLUMN skills_analysis jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE quiz_results DROP COLUMN overall_score;
ALTER TABLE quiz_results DROP COLUMN matched_skills;
ALTER TABLE quiz_results DROP COLUMN missing_skills;
ALTER TABLE quiz_results DROP COLUMN skill_levels;
ALTER TABLE quiz_results DROP COLUMN skill_comparison;
