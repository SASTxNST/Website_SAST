import express from "express";
import dotenv from "dotenv";
import botRouter from "./routes/botRoutes.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use("/api/bot", botRouter);
app.use("/api/auth",userRoutes)
app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
