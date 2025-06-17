import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDataBase } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Create an instance of an Express app
const app = express();

dotenv.config();

// Middleware to parse incoming JSON requests (important for POST/PUT APIs)
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// port
const port = process.env.PORT;

// Start the server on port 5001
app.listen(port, () => {
  connectDataBase();
  console.log(`Server is running on ${port}`);
});
