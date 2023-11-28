const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const router = new express.Router();
const Restaurant = require('../models/restaurant.js');
const User = require("../models/user.js")
const auth = require('../middleware/auth.js');
const admin = require("../middleware/admin.js")

// Endpoint for handling restaurant operations
router.route('/')
  .get(async (req, res) => {
    try {
      // Get a list of all restaurants
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(auth, async (req, res) => {
    try {
      // Check if the provided user ID is in a valid format
      const userId = req.headers._id;
      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      // Check if the user is already a restaurant owner
      const existingOwner = await User.findOne({ _id: userId, role: 'restaurant_owner' });
      if (existingOwner) {
        return res.status(400).json({ message: 'User is already a restaurant owner.' });
      }

      // Create a new restaurant and associate it with the user
      const newRestaurant = new Restaurant(req.body);
      const savedRestaurant = await newRestaurant.save();
      const restaurantId = savedRestaurant._id;
      const idAsString = restaurantId.toHexString();
      await User.findByIdAndUpdate(userId, { role: 'restaurant_owner', ownedRestaurant: idAsString });

      // Return the saved restaurant details
      res.json(savedRestaurant);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint for handling individual restaurant operations
router.route('/:id')
  .get(auth, async (req, res) => {
    try {
      // Check if the provided restaurant ID is in a valid format
      const restaurantId = req.params.id;
      if (!/^[0-9a-fA-F]{24}$/.test(restaurantId)) {
        return res.status(400).json({ message: 'Invalid restaurant ID format' });
      }

      // Retrieve and return the details of the specified restaurant
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      return res.status(200).json(restaurant);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(auth, admin, async (req, res) => {
    try {
      // Check if the provided restaurant ID is in a valid format
      const restaurantId = req.params.id;
    //   console.log(restaurantId)
      if (!/^[0-9a-fA-F]{24}$/.test(restaurantId)) {
        return res.status(400).json({ message: 'Invalid restaurant ID format' });
      }
      
      // Update and return the details of the specified restaurant
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true });
      res.json(updatedRestaurant);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
