const { body, validationResult } = require('express-validator');

// --- Register Validation ---
const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

// --- Login Validation ---
const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.')
];

// --- Error Handler ---
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, send a 400 response with the errors
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    // If there are no errors, proceed to the next function (the controller)
    next();
};

// Export everything to be used in other files
module.exports = {
    registerValidation,
    loginValidation,
    handleValidationErrors
};