import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (reused across serverless invocations)
let connection;
async function connectDB() {
  if (!connection) {
    connection = mongoose.connect(process.env.MONGO_URI);
  }
  return connection;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    connection = undefined;
    res.status(500).json({ message: "Database connection failed: " + err.message });
  }
});

app.get("/", (req, res) => res.json({ message: "Task Manager API running" }));
app.use("/api/tasks", taskRoutes);

export default app;
