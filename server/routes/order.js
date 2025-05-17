// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Ensure this path is correct

// POST: Create a new order
router.post('/submit-order', async (req, res) => {
  const { items, total, user } = req.body;

  if (!items || !total || !user) {
    return res.status(400).json({ message: 'Missing required order data' });
  }

  const newOrder = new Order({
    items,
    total: parseFloat(total),
    user,
  });

  try {
    await newOrder.save();
    res.json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error saving order' });
  }
});

// ✅ GET all orders (no double "orders")
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  try {
    const orders = userId
      ? await Order.find({ 'user.uid': userId })
      : await Order.find();

    if (orders.length === 0) {
      return res.status(200).json({ message: 'No orders found' });
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// PATCH: Update order status
router.patch("/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});





module.exports = router;
