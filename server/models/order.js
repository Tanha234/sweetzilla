const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },  // Use Number instead of String for total
  user: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["Placed", "Processing", "Delivered", "Cancelled"],
    default: "Placed",
  },
  
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
