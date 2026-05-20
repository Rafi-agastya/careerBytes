import { Response } from 'express';
import { db } from '../config/db';
import { trendingSkills } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authRequest } from '../middlewares/authMiddleware';

export const getPeriods = async (req: authRequest, res: Response): Promise<void> => {
  try {
    const periods = await db
      .selectDistinct({ year: trendingSkills.year })
      .from(trendingSkills)
      .orderBy(desc(trendingSkills.year));

    res.json({
      message: 'Success',
      data: periods.map((p) => p.year),
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTrendingSkills = async (req: authRequest, res: Response): Promise<void> => {
  try {
    const reqYear = req.query.year ? parseInt(req.query.year as string, 10) : 2026;

    if (isNaN(reqYear)) {
      res.status(400).json({ message: 'Parameter tahun harus berupa angka yang valid' });
      return;
    }

    const rawData = await db
      .select()
      .from(trendingSkills)
      .where(eq(trendingSkills.year, reqYear))
      .orderBy(desc(trendingSkills.popularityScore));

    if (rawData.length === 0) {
      res.status(404).json({ message: `Data tren untuk tahun ${reqYear} tidak ditemukan` });
      return;
    }

    const topGrowthItem = rawData.reduce(
      (max, item) => (item.growth > max.growth ? item : max),
      rawData[0],
    );

    const highDemandCount = rawData.filter((item) => item.demand >= 70).length;

    res.status(200).json({
      status: 'success',
      year: reqYear,
      stats: {
        topGrowth: {
          skillName: topGrowthItem.skillName,
          value: `${topGrowthItem.growth}%`,
        },
        highDemandCount,
        jobPostingsAnalyzed: '50K+',
      },
      chartData: rawData.map((item) => ({
        skillName: item.skillName,
        growth: item.growth,
        demand: item.demand,
        popularityScore: item.popularityScore,
      })),
    });
  } catch (error) {
    console.error('Error pada getTrendingSkills Controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
