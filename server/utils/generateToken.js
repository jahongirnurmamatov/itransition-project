import jwt from "jsonwebtoken";

export const generatTokenAndSetCookie = async (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none", 
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};