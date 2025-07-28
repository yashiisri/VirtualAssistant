import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userrRouter from "./routes/userr.routes.js";
import geminiResp from "./gemini.js";

dotenv.config();

const app = express();

// ✅ CORS Fix: allow only frontend origin with credentials
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());  // ✅ Fix here

// Routes
app.use("/api/auth", userRouter);
app.use("/api/user", userrRouter);
app.get("/", async (req, res) => {
  const prompt = req.query.prompt;
  const data = await geminiResp(prompt);

  if (!data) {
    return res.status(500).json({ message: "No response from Gemini" });
  }

  res.json(data);
});


// Start Server
app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}`);
});
