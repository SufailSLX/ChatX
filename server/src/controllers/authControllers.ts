import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existing: IUser | null = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user: IUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id.toString(),  // now TypeScript knows _id exists
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
