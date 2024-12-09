import bcrypt from "bcryptjs";
import User from "../models/user.model.js";


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
    return res.status(200).json({ success: true, message: "User created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
