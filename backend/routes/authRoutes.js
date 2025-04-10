const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");
const nodemailer = require("nodemailer");

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not authorized" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      type,
      domain,
      name,
      contactNumber,
      bio,
      education,
      CGPA,
      skills,
      rating,
      resume,
      profile,
      year,
      branch,

      address,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Create new user

  
    const user = new User({ email, password, type ,name,year,branch,domain,contactNumber,education,address,CGPA,resume,profile});

    await user.save();

    let userDetails;
    if (type === "recruiter") {
      userDetails = new Recruiter({
        userId: user._id,
        name,
        contactNumber,
        bio,
      });
    } else {
      userDetails = new JobApplicant({
        userId: user._id,
        name,
        education,
        CGPA,
        year,
        skills,
        domain,
        contactNumber,
        rating,
        resume,
        profile,

        address,
        branch

      });
    }

    await userDetails.save();

    // Generate Token
    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, type: user.type });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const userP = await User.find({ password });
    if (!userP) {
      return res.status(400).send({
        success: false,
        message: "Password is invalid",
      });
    }

    //
    //token
    const token = await jwt.sign({ _id: user._id }, authKeys.jwtSecretKey, {
      expiresIn: "7d",
    });

    res.json({
      token: token,
      type: user.type,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
    
//     failureRedirect: "http://localhost:3000/login",
//   }),
//   (req, res) => {
//     const { user, token } = req.user;
    
//     // Redirect to frontend with JWT token
//     res.redirect(`http://localhost:3000/applicant?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
// }
// );

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign({ _id: req.user._id }, authKeys.jwtSecretKey, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true });

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/applicant?token=${token}&type=${req.user.type}`);
  }
);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🟢 Forgot Password - Send Reset Link
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Reset Token
    const resetToken = jwt.sign({ id: user._id }, authKeys.jwtSecretKey, {
      expiresIn: "1h",
    });

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send Reset Email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<h3>Click the link to reset your password:</h3><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 🟢 Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  console.log(token, newPassword);

  try {
    // console.log(user._id);
    const decoded = jwt.verify(token, authKeys.jwtSecretKey);
    

    const user = await User.findOne({ _id: decoded.id, resetToken: token });
 

    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    console.log(newPassword);
    console.log(user._id);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,

      { password: newPassword },
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid token" });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.FRONTEND_URL}`);
});
module.exports = router;