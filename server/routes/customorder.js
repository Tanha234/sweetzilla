const express = require('express');
const multer = require('multer');
const path = require('path');
const CakeOrder = require('../models/customorder');  // Make sure path is correct

const router = express.Router();

// Multer setup (for image upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST route - create new order
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, cakeFlavor, cakeSize, deliveryDate, message } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const order = new CakeOrder({
      name,
      email,
      phone,
      cakeFlavor,
      cakeSize,
      deliveryDate,
      message,
      imageUrl,
      status: 'Pending'  // default initial status
    });

    await order.save();
    res.status(201).json({ message: 'Order saved', order });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// GET route - fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await CakeOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// PATCH route - update order status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const order = await CakeOrder.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
