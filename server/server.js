
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
dotenv.config({ override: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/reports", reportRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CivicPulse AI API",
    status: "Server is running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CivicPulse AI running on port ${PORT}`);
});
