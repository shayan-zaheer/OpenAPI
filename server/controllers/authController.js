const User = require("../models/User");
const passport = require("passport");

exports.ensureAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).json({ message: "Unauthorized. Please log in first." });
};

exports.signUp = async (request, response) => {
  try {
    const { displayName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return response.status(400).json({ message: "Email already in use" });

    const newUser = new User({
      provider: "local",
      displayName,
      email,
      password,
    });

    await newUser.save();
    response.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    response.status(500).json({ message: "Server error" });
  }
};

exports.login = (request, response, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return response.status(500).json({ status: "fail", message: "Server error" });

    if (!user) return response.status(401).json({ status: "fail", message: "Invalid credentials" });

    request.logIn(user, (err) => {
      if (err) return response.status(500).json({ status: "fail", message: "Login failed" });

      response.status(200).json({
        status: "success",
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
        },
      });
    });
  })(request, response, next);
};

exports.logout = (request, res) => {
  request.logout(() => {
    response.status(200).json({ status: "success", message: "Logged out!" });
  });
};
