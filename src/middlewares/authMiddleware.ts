import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
    }
  }
}

export interface authRequest extends Request {
  user?: { id: number; email: string };
}

export const protect = (
  req: authRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token tidak ada' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token tidak Valid' });
  }
};
