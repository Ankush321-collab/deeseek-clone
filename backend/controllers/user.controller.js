const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { jwt_user_password } = require("../config");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, Email, password } = req.body;
    const userEmail = email || Email;

    if (!firstName || !lastName || !userEmail || !password) {
      return res.status(400).json({
        message: `Missing required fields: ${[
          !firstName && "firstName",
          !lastName && "lastName",
          !userEmail && "email",
          !password && "password",
        ]
          .filter(Boolean)
          .join(", ")}`,
        success: false,
      });
    }

    const existingUser = await User.findOne({ email: userEmail.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email: userEmail.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "Signup succeeded",
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, Email, password } = req.body;
    const userEmail = email || Email;

    if (!userEmail || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email: userEmail.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, jwt_user_password, {
      expiresIn: "1d",
    });

    const { password: _, ...userResponse } = user.toObject(); // Exclude password

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite:"Strict"

    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error during login",
      success: false,
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login, logout };
