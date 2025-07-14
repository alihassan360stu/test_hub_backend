const express = require("express");
const app = express();
var cors = require('cors')
require("dotenv").config();

app.use(cors())
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const dataGeneratorRoutes = require("./routes/data-generator.routes");
app.use("/api/auth", authRoutes);
app.use("/api/generator", dataGeneratorRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = app;
