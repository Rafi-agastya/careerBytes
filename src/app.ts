import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from './config/passport';
import authRoutes from './routes/authRoutes';

// Inisialisasi Drizzle ORM
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Endpoint untuk health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running On PORT ${PORT}`);
});
