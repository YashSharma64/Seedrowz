// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import evaluateRoutes from "./routes/evaluateRoutes.js";
import prisma from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Seedrowz backend running"));

app.use("/api/users", userRoutes);
app.use("/api", evaluateRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
