

const User=require("../models/user.js")


module.exports = async (req, res, next) => {
    try {
        const userId = req.headers._id; 
        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
          }
        const user = await User.findById(userId);
        // console.log(userId)
        // console.log(user.ownedRestaurant)
        const restaurantId = user.ownedRestaurant;
        const idAsString = restaurantId.toHexString();
        // console.log(req.params.id)
        if (!user || user.role !== 'restaurant_owner' || idAsString !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

