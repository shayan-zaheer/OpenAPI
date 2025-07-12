const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/User");

const configurePassport = (app) => {
    app.use(
        session({
            secret: "secret",
            saveUninitialized: true,
            resave: false,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email }).select(
                        "+password"
                    );

                    if (!user || user.provider !== "local") {
                        return done(null, false, {
                            message: "User not found or uses Google login",
                        });
                    }

                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!isMatch)
                        return done(null, false, {
                            message: "Incorrect password",
                        });

                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({
                        email: profile.emails[0].value,
                    });

                    if (!user) {
                        user = await User.create({
                            provider: "google",
                            providerId: profile.id,
                            username: profile.displayName,
                            email: profile.emails[0].value,
                            profilePhoto: profile.photos[0]?.value || "",
                        });
                    }

                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    });
};

module.exports = configurePassport;