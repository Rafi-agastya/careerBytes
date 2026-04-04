import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { authRequest } from '../middlewares/authMiddleware';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password} = req.body as {name: string, email: string, password: string};
    try{
        console.log('req.body:', req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'insert into users(name, email, password) values ($1, $2, $3) returning id, name, email',
            [name, email, hashedPassword]
        );
        res.status(201).json({message: 'Registrasi Berhasi!', user: result.rows[0]});
    } catch (err: any){
        console.log('error:', err);
        if(err.code === '23505'){
            res.status(400).json({message: 'Email anda Sudah Terdaftar'});
            return
        }
        res.status(500).json({message: 'Server Error'});
    }
};

//Login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as {email: string, password: string};
    try{
        const result = await pool.query('select * from users where email = $1', [email]);
        const user = result.rows[0];
        if(!user){
            res.status(401).json({message: 'Email atau Password Salah'});
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            res.status(401).json({message: 'Email atau Password Salah'})
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d'}
        );
        res.json({message: 'Login berhasil!', token});
    }   catch {
        res.status(500).json({message: 'Server Error'});
    }
};

export const getMe = async (req: authRequest, res: Response): Promise<void> => {
    try{
        const result = await pool.query(
            'select id, name, email, created_at from users where id = $1',
            [req.user?.id]
        );
        res.json({user: result.rows[0]});
    } catch {
        res.status(500).json({message: 'Server error'})
    }
};

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as { id: number; email: string };  // cast manual

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};