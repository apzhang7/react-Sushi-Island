// routes/orders.js
const express = require("express");
const Order = require("../models/Orders");
const router = express.Router();

// POST new order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("items.menuItemId");
  res.json(orders);
});

// GET recent orders (last N)
router.get("/recent", async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("items.menuItemId"); // populate the menu item
  res.json(orders);
});

module.exports = router;
