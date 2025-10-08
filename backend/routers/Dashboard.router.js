const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const authMiddleware = require('../middlewares/auth.middleware'); 

// Protected route to get user dashboard data
router.get('/dashboard',  authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Dashboard data fetched successfully', user });
    } catch (error) {
        console.error('Dashboard data fetch mein error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;