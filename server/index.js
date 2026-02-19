const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGOURL = process.env.AGROSWAP_DB_URL;
const PORT = process.env.PORT || 5000;

// 🔥 Connect DB first, then start server
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });

// Basic Route
app.get("/", (req, res) => {
  res.send("AgroSwap Backend Running 🚜");
});