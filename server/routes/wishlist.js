const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

// ✅ POST: Add to wishlist
router.post('/', async (req, res) => {
  const { userId, item } = req.body;

  try {
    if (!userId || !item) {
      return res.status(400).json({ message: 'Missing required fields: userId or item' });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [item] });
    } else if (!wishlist.items.some(i => i.id === item.id)) {
      wishlist.items.push(item);
    } else {
      return res.status(200).json({ message: 'Already in wishlist' });
    }

    await wishlist.save();
    res.status(200).json({ message: 'Added to wishlist', wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
});

// ✅ GET: Get wishlist by displayName
router.get('/:displayName', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.displayName });

    if (!wishlist) {
      return res.status(404).json({ message: 'No wishlist found for this user' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// ✅ DELETE: Remove item from wishlist
router.delete('/:displayName/:itemId', async (req, res) => {
  const { displayName, itemId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId: displayName });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const originalLength = wishlist.items.length;
    wishlist.items = wishlist.items.filter(item => item.id !== itemId);

    if (wishlist.items.length === originalLength) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    await wishlist.save();
    res.status(200).json({ message: 'Item deleted from wishlist', wishlist });
  } catch (error) {
    console.error('Error deleting item from wishlist:', error);
    res.status(500).json({ message: 'Error deleting item from wishlist' });
  }
});

module.exports = router;
