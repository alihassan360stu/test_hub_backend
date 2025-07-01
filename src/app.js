const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = app;
