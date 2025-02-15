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
<<<<<<< HEAD
    const { displayName, email, password } = request.body;
=======
    const { username, email, password } = request.body;
>>>>>>> 4ad1a3d2261a3b46f8c8c99fc8b757608f2d275b

    const existingUser = await User.findOne({ email });
    if (existingUser) return response.status(400).json({ message: "Email already in use" });

    const newUser = new User({
      provider: "local",
      username,
      email,
      password,
    });

    await newUser.save();
    response.status(201).json({ message: "User registered successfully" });
  } catch (err) {
<<<<<<< HEAD
    response.status(500).json({ message: err.message });
=======
    response.status(500).json({ message: "error: "+ err.message  });
>>>>>>> 4ad1a3d2261a3b46f8c8c99fc8b757608f2d275b
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

exports.logout = (request, response) => {
  request.logout(() => {
    response.status(200).json({ status: "success", message: "Logged out!" });
  });
};
