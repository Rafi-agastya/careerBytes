import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './db';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('profile:', profile);
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        const googleId = profile.id;

        const exiting = await pool.query(
          'select * from users where google_id = $1 or email = $2',
          [googleId, email],
        );

        if (exiting.rows.length > 0) {
          const user = exiting.rows[0];
          if (!user.google_id) {
            await pool.query('update users set google_id = $1 where id = $2', [
              googleId,
              user.id,
            ]);
          }
          return done(null, user);
        }

        const newUser = await pool.query(
          'insert into users (name, email, google_id) values ($1, $2, $3) returning *',
          [name, email, googleId],
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        return done(err as Error);
      }
    },
  ),
);

export default passport;
