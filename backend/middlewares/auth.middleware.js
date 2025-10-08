// middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

// Aapka function ka naam authMiddleware rakhte hain consistency ke liye
const authMiddleware = (req, res, next) => {
    // 1. Header se token nikalna
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // 2. Check karna ki token hai ya nahi
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // 3. Token ko verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Decoded token se user object nikal kar req.user mein daalna
        // YEH AAPKA ORIGINAL AUR SAHI LOGIC HAI
        req.user = decoded.user;

        // 5. Agle step par jaana
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;