const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/User");

const configurePassport = app => {
    app.use(session({
        secret: "secret",
        saveUninitialized: true,
        resave: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                return done(null, false, { message: "Invalid credentials" });
            }
    
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
    

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async(id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    });
}

module.exports = configurePassport;