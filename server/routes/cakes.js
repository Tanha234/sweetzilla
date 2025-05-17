const express = require("express");
const multer = require("multer");
const path = require("path");
const Cake = require("../models/Cake");

const router = express.Router();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all cakes
router.get("/", async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cakes" });
  }
});

// GET a single cake by ID
router.get("/:id", async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json(cake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST add new cake (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      id,
      name,
      tags,
      description,
      ingredients,
      availability,
      rating,
      reviews,
      category,
      sku,
      sizes,
      discount,
    } = req.body;

    const cake = new Cake({
      id,
      name,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      tags: JSON.parse(tags),
      description,
      ingredients: JSON.parse(ingredients),
      availability: availability === "true",
      rating: parseFloat(rating),
      reviews: parseInt(reviews),
      category,
      sku,
      sizes: JSON.parse(sizes),
      discount: JSON.parse(discount),
    });

    await cake.save();
    res.status(201).json({ message: "Cake added", cake });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save cake" });
  }
});

// PUT update cake by ID (with optional image upload)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    // Prepare updated fields from req.body
    const {
      id,
      name,
      tags,
      description,
      ingredients,
      availability,
      rating,
      reviews,
      category,
      sku,
      sizes,
      discount,
    } = req.body;

    // Update fields - parse JSON where needed
    if (id) cake.id = id;
    if (name) cake.name = name;
    if (tags) cake.tags = JSON.parse(tags);
    if (description) cake.description = description;
    if (ingredients) cake.ingredients = JSON.parse(ingredients);
    if (availability !== undefined) cake.availability = availability === "true";
    if (rating) cake.rating = parseFloat(rating);
    if (reviews) cake.reviews = parseInt(reviews);
    if (category) cake.category = category;
    if (sku) cake.sku = sku;
    if (sizes) cake.sizes = JSON.parse(sizes);
    if (discount) cake.discount = JSON.parse(discount);

    // If new image uploaded, update image path
    if (req.file) {
      cake.image = `/uploads/${req.file.filename}`;
    }

    await cake.save();

    res.json({ message: "Cake updated successfully", cake });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cake" });
  }
});

// DELETE cake by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json({ message: "Cake deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
