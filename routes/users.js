const express = require('express');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const router = new express.Router();
const User = require('../models/user.js');
const auth=require("../middleware/auth.js");



router.route('/signup').post(async (req, res) => {
    try {
        // console.log('Received signup request:', req.body);

        const existingUser = await User.find({ email: req.body.email });

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Assuming you have a plaintext password in req.body.password
        const plaintextPassword = req.body.password;

        // Hash the password before saving it
        const saltRounds = 10;
        const hash = await bcrypt.hash(plaintextPassword, saltRounds);

        const user = new User({
            email: req.body.email,
            password: hash,
            name:req.body.name
        });

        await user.save();

        // console.log(user);
        // console.log('User signed up successfully');
        return res.status(201).json({
            message: "User signed up successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
});


//////////////////////////////creating a login route for a user//////////////////////////////////////////

router.route('/login').post(async (req, res) => {
    try {
        const users = await User.find({ email: req.body.email });

        if (users.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

        const result = await bcrypt.compare(req.body.password, users[0].password);

        if (result) {
            const token = jwt.sign(
                {
                    email: users[0].email,
                    userId: users[0]._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "10d"
                }
            );

            return res.status(200).json({
                message: "Authentication successful",
                token: token,
                _id:users[0]._id
            });
        } else {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
});

//reset password
router.route('/changepassword').put(async (req, res) => {
    try {
      const users = await User.find({ email: req.body.email});
      if (!users.length===0) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      const user=users[0]
     
      
      const currentPassword = req.body.password;
      const newPassword = req.body.newpassword;
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Current password is incorrect',
        });
      }
      console.log(newPassword)
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
  
      await user.save();
  
      return res.status(200).json({
        message: 'Password changed successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  });


//get all users
router.route("/").get(auth,async (req,res)=>{
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message,
        });
    }
})


router.route('/:id').delete(auth, async (req, res) => {
    try {
        const userId = req.params.id;
        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
          }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'restaurant_owner' && user.ownedRestaurant) {
            // If yes, delete the restaurant associated with the user
            const deletedRestaurant = await Restaurant.findByIdAndDelete(user.ownedRestaurant);
            // Handle the case when the restaurant is not found
            if (!deletedRestaurant) {
                console.warn('Restaurant not found for the user.');
            }
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User and associated restaurant deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});




module.exports = router;
