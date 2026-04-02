import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config(); // 🔥 MUST be at top

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("API KEY:", process.env.OPENROUTER_API_KEY);

// Routes
app.use("/api/generate", generateRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});