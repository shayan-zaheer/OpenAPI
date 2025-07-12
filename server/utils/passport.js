const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/User");

const configurePassport = (app) => {
    if (process.env.NODE_ENV === "production") {
        app.set("trust proxy", 1);
    }

    app.use(
        session({
            secret: process.env.SESSION_SECRET || "supersecretkey",
            resave: false,
            saveUninitialized: false,
            cookie: {
                sameSite:
                    process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            },
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
                    // Check if profile has required data
                    if (
                        !profile.emails ||
                        !profile.emails[0] ||
                        !profile.emails[0].value
                    ) {
                        return done(
                            new Error("No email found in Google profile"),
                            null
                        );
                    }

                    let user = await User.findOne({
                        email: profile.emails[0].value,
                    });

                    if (!user) {
                        // Check if user with same providerId exists
                        const existingUser = await User.findOne({
                            providerId: profile.id,
                            provider: "google",
                        });

                        if (existingUser) {
                            return done(null, existingUser);
                        }

                        user = await User.create({
                            provider: "google",
                            providerId: profile.id,
                            username:
                                profile.displayName ||
                                profile.emails[0].value.split("@")[0],
                            email: profile.emails[0].value,
                            profilePhoto:
                                profile.photos && profile.photos[0]
                                    ? profile.photos[0].value
                                    : "",
                        });
                    } else if (user.provider !== "google") {
                        // User exists but with different provider
                        return done(
                            new Error(
                                "Email already registered with different provider"
                            ),
                            null
                        );
                    }

                    return done(null, user);
                } catch (err) {
                    console.error("Google Strategy Error:", err);
                    return done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log("Serializing user:", user._id);
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return done(new Error("User not found"), null);
            }
            console.log("Deserializing user:", user._id);
            return done(null, user);
        } catch (err) {
            console.error("Deserialize Error:", err);
            return done(err, null);
        }
    });
};

module.exports = configurePassport;
