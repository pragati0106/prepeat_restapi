







// routes/restaurants.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.js');

// Fetch all restaurants of a specific category
router.route("/:category").get(async (req, res) => {
  try {
    const category = req.params.category;

    // Find restaurants with the specified category in their menu
    const restaurants = await Restaurant.find({ 'menu.category': category });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;