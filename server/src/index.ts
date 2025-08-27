import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

// Basic route
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Create HTTP + WebSocket server
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: process.env.CLIENT_ORIGIN }
});

// Socket test
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("chat-message", (msg) => {
    console.log("Message received:", msg);
    io.emit("chat-message", msg);
  });
});

// Mongo + start server
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => console.error("Mongo error:", err));
