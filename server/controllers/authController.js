const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passport = require("passport");

exports.ensureAuthenticated = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    }
    response.status(401).json({ message: "Unauthorized. Please log in first." });
};

exports.login = (request, response) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return response.status(500).json({
        status: "fail",
        message: "Server error",
      });
    }

    if (!user) {
      return response.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    request.logIn(user, (err) => {
      if (err) {
        return response.status(500).json({
          status: "fail",
          message: "Login failed",
        });
      }

      response.status(200).json({
        status: "success",
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
        },
      });
    });
  })(request, response);
}

exports.forgetPassword = async (request, response) => {
    try{
        const user = await User.findOne({email: request.body.email});
        if(!user){
            return response.status(404).json({status: "fail", message: "User not found!"});
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
    
        await user.save();
    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });
    
        const mailOptions = {
          to: user.email,
          from: process.env.MY_EMAIL,
          subject: "Password Reset",
          text: `Click on this link to reset your password: http://localhost:8000/reset-password/${resetToken}`,
        };
    
        await transporter.sendMail(mailOptions);
        response.send("Password reset link sent to your email");
    
    } catch(err){
        return response.status(400).json({status: "success", message: err.message});
    }
}

exports.resetPassword = async (request, response) => {
    try{
        const user = await User.findOne({
            resetPasswordToken: request.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          });
      
          if (!user) return response.status(400).send("Invalid or expired token");
      
          user.password = request.body.password;
      
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
      
          await user.save();
          response.send("Password has been reset successfully");
      
    } catch(err){
        return response.status(400).json({status: "fail", message: err.message});
    }
}

exports.signUp = async(request, response) => {
    try{
        const {name, email, password} = request.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return response.status(400).json({
                status: "fail",
                message: "User with this email already exists!"
            });
        }   

        const user = await User.create({name, email, password});

        return response.status(201).json({
            status: "success",
            user: user
        })
    } catch(err){
        return response.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}
