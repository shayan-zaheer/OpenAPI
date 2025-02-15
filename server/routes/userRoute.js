const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.login);

  router.route("/logout").get((request, response) => {
    request.logout(() => {
      response.status(200).json({status: 'success', message: "Logged out!"});
    });
  });

  router.route("/reset-password/:token").post(userController.resetPassword);
  router.route("/forget-password").post(userController.forgetPassword);

  router.route("/users").get(userController.ensureAuthenticated, userController.getAllUsers);

module.exports = router;