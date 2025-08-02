import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find a user with the Google ID
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        // If user exists, return them
        return done(null, user);
      } else {
        // If user doesn't exist, check if an account with that email already exists
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If email exists, link the Google ID to that account
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        } else {
          // If no user and no email, create a new user
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
          await newUser.save();
          return done(null, newUser);
        }
      }
    } catch (err) {
      console.error("Error in Google Strategy:", err); // Log the specific error
      return done(err, false);
    }
  }
));

export default passport; 