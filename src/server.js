require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Connecting to Mongo:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false
    });

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  }
}
app.use("/api/v1", require("./routes/bag"));

startServer();
