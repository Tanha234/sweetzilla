const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');
const fs = require('fs');  // Add fs module
const path = require('path');  // Add path module
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const orderRouter = require('./routes/order');
const wishlistRoutes = require('./routes/wishlist');
const cakeRoutes = require('./routes/cakes');
const  customOrderRouter=require('./routes/customorder')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // ✅ Add this for image access

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads'); // Define upload path
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
}

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/orders', orderRouter);       
app.use('/api/wishlist', wishlistRoutes);  
app.use('/api/cakes', cakeRoutes); 
app.use('/api/customorders', customOrderRouter);
       

// Firebase Token Verification
app.post('/firebase-login', async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    res.json(decodedToken);
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
