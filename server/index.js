import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import uploadRoute from "./routes/upload.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
 
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// routes
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
