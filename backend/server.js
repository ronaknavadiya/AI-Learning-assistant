import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/errorHandler.js";

// ES6 module __dirname alternative
const__filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Initialize Express app
const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder to upload files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(errorHandler);

// Not found handler (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Resource not found",
    statusCode: 404,
  });
});

//  Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
