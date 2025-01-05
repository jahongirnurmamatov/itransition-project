import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import uploadRoute from "./routes/upload.route.js";
import templateRoute from "./routes/template.route.js";
import commentRoute from "./routes/comment.route.js";
import userRoute from "./routes/user.route.js";
import responseRoute from "./routes/responses.route.js";
import activityRoute from "./routes/activity.route.js";
import tagRoute from "./routes/tag.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.io.js";
dotenv.config();
 
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", 
  "https://itransition-project-nine.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// routes
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/template", templateRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
app.use("/api/response", responseRoute);
app.use("/api/activity", activityRoute);
app.use("/api/tag", tagRoute);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
