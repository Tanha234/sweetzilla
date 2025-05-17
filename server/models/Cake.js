const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  weight: Number,
  unit: String,
  price: Number,
  available: Boolean,
});

const discountSchema = new mongoose.Schema({
  percentage: Number,
  validUntil: String,
});

const cakeSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  tags: [String],
  description: String,
  ingredients: [String],
  availability: Boolean,
  rating: Number,
  reviews: Number,
  category: String,
  sku: String,
  sizes: [sizeSchema],
  discount: discountSchema,
});

module.exports = mongoose.model("Cake", cakeSchema);
