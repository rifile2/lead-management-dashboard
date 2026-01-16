const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err.message);
    });

// API Routes
app.use("/api/leads", require("./routes/leadRoutes"));

// Serve React frontend build
app.use(express.static(path.join(__dirname, "public")));

// React Router fallback (IMPORTANT for Render + Node 22)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Port (Render assigns dynamically)
const PORT = process.env.PORT || 5000;

// 🔥 VERY IMPORTANT: bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});