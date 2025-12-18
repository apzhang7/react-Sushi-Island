

// routes/menu.js
const express = require("express");
const MenuItem = require("../models/Menu");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});


module.exports = router;
