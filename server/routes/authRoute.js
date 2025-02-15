const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);

  router.route("/logout").get((request, response) => {
    request.logout(() => {
      response.status(200).json({status: 'success', message: "Logged out!"});
    });
  });

  router.route("/reset-password/:token").post(authController.resetPassword);
  router.route("/forget-password").post(authController.forgetPassword);

  router.route("/users").get(authController.ensureAuthenticated, authController.getAllUsers);

module.exports = router;