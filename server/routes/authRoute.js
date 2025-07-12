const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", { failureRedirect: "/" }),
  (request, response) => {
    const redirectURL =
      process.env.NODE_ENV === "production"
        ? "https://open-api-iota-eosin.vercel.app/"
        : "http://localhost:5173/";

    response.redirect(redirectURL);
  }
);

router.route("/status").get((request, response) => {
  if (request.isAuthenticated()) {
      return response.json({ status: "authenticated", user: request.user });
  } else {
      return response.json({ status: "unauthenticated" });
  }
})

module.exports = router;