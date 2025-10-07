const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {
    registerValidation,
    loginValidation,
    handleValidationErrors
} = require('../Auth-validation/validation');

// REGISTER ROUTE
router.post('/register', registerValidation, handleValidationErrors, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save(); // Password hashing model mein automatically ho jayegi
        
        res.status(201).json({ message: 'Registration successful!' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error. Registration failed.' });
    }
});


// LOGIN ROUTE
router.post('/login', loginValidation, handleValidationErrors, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: 'Login successful!',
                    token: token
                });
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Login fail ho gaya.' });
    }
});

module.exports = router;