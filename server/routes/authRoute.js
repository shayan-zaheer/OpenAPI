const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/google").get((req, res, next) => {
  console.log("Initiating Google auth...");
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

router.route("/google/callback").get(
  passport.authenticate("google", { 
    failureRedirect: process.env.NODE_ENV === "production" 
      ? "https://open-api-iota-eosin.vercel.app/login?error=auth_failed" 
      : "http://localhost:5173/login?error=auth_failed"
  }),
  (request, response) => {
    const redirectURL =
      process.env.NODE_ENV === "production"
        ? "https://open-api-iota-eosin.vercel.app/"
        : "http://localhost:5173/";

    console.log("Google auth successful for user:", request.user?._id);
    response.redirect(redirectURL);
  }
);

router.route("/status").get((request, response) => {
  console.log("Auth status check - isAuthenticated:", request.isAuthenticated());
  console.log("User:", request.user ? request.user._id : "No user");
  
  if (request.isAuthenticated()) {
      return response.json({ status: "authenticated", user: request.user });
  } else {
      return response.json({ status: "unauthenticated" });
  }
})

// Test endpoint for debugging
router.route("/test").get((req, res) => {
  res.json({
    message: "Auth routes working",
    environment: process.env.NODE_ENV,
    googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
    sessionSecret: process.env.SESSION_SECRET ? "Set" : "Not set"
  });
});

module.exports = router;