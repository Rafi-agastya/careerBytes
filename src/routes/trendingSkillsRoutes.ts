import { Router } from 'express';
import { getPeriods, getTrendingSkills } from '../controllers/trendingSkillsController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/periods', protect, getPeriods);
router.get('/', protect, getTrendingSkills);

export default router;
