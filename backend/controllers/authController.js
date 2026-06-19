import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password, mobile, address, pincode, userType } =
    req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email and password required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
    mobile,
    address,
    pincode,
    userType: userType || "USER"
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      pincode: user.pincode,
      userType: user.userType
    },
    token: generateToken(user._id)
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType
      },
      token: generateToken(user._id)
    });
  }

  res.status(401).json({ message: "Invalid email or password" });
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};