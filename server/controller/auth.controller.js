import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generatTokenAndSetCookie } from "../utils/generateToken.js";


export const signup = async(req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    generatTokenAndSetCookie(res,user._id); 
    return res.status(200).json({ success: true, message: "User created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
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
    generatTokenAndSetCookie(res,user._id); 
    return res.status(200).json({ success: true, message: "User logged in" });    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const logout = async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User logged out" });
}