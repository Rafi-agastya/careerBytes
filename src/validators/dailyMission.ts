import { z } from 'zod';

// GET /api/daily-mission?roleId=1&level=beginner
export const getMissionQuerySchema = z.object({
  roleId: z
    .string()
    .min(1, 'roleId wajib diisi')
    .transform((v) => parseInt(v, 10))
    .refine((v) => !isNaN(v) && v > 0, 'roleId harus angka positif'),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({
      message: 'level harus: beginner | intermediate | advanced',
    }),
  }),
});

// GET /api/daily-mission/progress?roleId=1
export const progressQuerySchema = z.object({
  roleId: z
    .string()
    .min(1, 'roleId wajib diisi')
    .transform((v) => parseInt(v, 10))
    .refine((v) => !isNaN(v) && v > 0, 'roleId harus angka positif'),
});

// POST /api/daily-mission/submit
export const answerItemSchema = z.object({
  missionId: z
    .number({ message: 'missionId wajib berupa angka' })
    .int()
    .positive(),
  answer: z
    .string()
    .min(10, 'Jawaban minimal 10 karakter')
    .max(5000, 'Jawaban maksimal 5000 karakter'),
});

export const submitMissionSchema = z.object({
  roleId: z.number({ message: 'roleId wajib berupa angka' }).int().positive(),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({
      message: 'level harus: beginner | intermediate | advanced',
    }),
  }),
  answers: z
    .array(answerItemSchema)
    .min(1, 'Minimal 1 jawaban')
    .max(5, 'Maksimal 5 jawaban'),
});

export type GetMissionQuery = z.infer<typeof getMissionQuerySchema>;
export type ProgressQuery = z.infer<typeof progressQuerySchema>;
export type SubmitMissionBody = z.infer<typeof submitMissionSchema>;
