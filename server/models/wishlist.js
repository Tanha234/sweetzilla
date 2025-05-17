// models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      id: String,
      name: String,
      image: String,
      price:String,
      description:String
    }
  ]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
