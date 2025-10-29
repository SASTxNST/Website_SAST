/* eslint-disable no-undef */
const express = require("express");
require("dotenv").config();
const botRouter = require("./routes/botRoutes");
const cors = require("cors");

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

app.use("/bot", botRouter);

app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
