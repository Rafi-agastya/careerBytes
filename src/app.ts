import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from './config/passport';
import authRoutes from './routes/authRoutes';
import trendingSkillsRoutes from './routes/trendingSkillsRoutes';
import skillAssessmentRoutes from './routes/skillAssessmentRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/trending-skills', trendingSkillsRoutes);
app.use('/api/skill-assessment', skillAssessmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running On PORT ${PORT}`)
})