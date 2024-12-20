import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import uploadToCloudinary from "./utils/cloudinaryConfig.js";
import upload from "./utils/multer.js";
dotenv.config();

const app = express();
 
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    res.json('multer called')
  
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});


// routes
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
