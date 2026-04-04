import { Router } from 'express';
import { register, login, getMe, googleCallback } from '../controllers/authControllers';
import { protect } from '../middlewares/authMiddleware';
import passport from '../config/passport';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

router.get('/google', (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        redirect_uri: 'http://localhost:3000/api/auth/google/callback',
        response_type: 'code',
        scope: 'profile email',
        access_type: 'offline',
        prompt: 'select_account'
    });
    
    console.log('Redirecting to:', `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login', session: false}),
    googleCallback
    
);

export default router;