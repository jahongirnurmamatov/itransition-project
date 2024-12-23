import bcrypt from "bcryptjs";
import { generatTokenAndSetCookie } from "../utils/generateToken.js";
import prisma from "../db/prisma.js";

export const signup = async (req, res) => {
  console.log('here')
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    if (user) {
      generatTokenAndSetCookie(res, user.id);
      return res.status(200).json({ success: true, message: "User created" });
    }else{
      return res.status(500).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    generatTokenAndSetCookie(res, user.id);
    return res.status(200).json({ success: true, message: "User logged in" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "User logged out" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          avatar: true
        },
      });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
