// models/CakeOrder.js

const mongoose = require('mongoose');

const cakeOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cakeFlavor: String,
  cakeSize: String,
  deliveryDate: Date,
  message: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    default: 'Pending', // default status when new order created
  },
});

module.exports = mongoose.model('CakeOrder', cakeOrderSchema);
