import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

const port = process.env.PORT || 5000;

// Connect to MongoDB + start server
connectDB().then(() => {
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
});

