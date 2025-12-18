require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors({
  origin: "https://react-sushi-island.vercel.app"
}));
app.use(express.json());

// 🔌 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// 📦 API routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);


app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
