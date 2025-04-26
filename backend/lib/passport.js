const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../db/User");


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "https://placement-cell-app-2.onrender.com/auth/google/callback",
            passReqToCallback: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        // profilePicture: profile.photos[0].value,
                        type: "Applicant", // Default role, can be changed
                    });
                    await user.save();
                }

                // Generate JWT Token
                const token = jwt.sign({ id: user._id, type: user.type },  authKeys.jwtSecretKey, {
                    expiresIn: "7d",
                });

                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
