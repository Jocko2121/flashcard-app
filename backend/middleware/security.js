const rateLimit = require('express-rate-limit');
const { body, param, validationResult } = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});

// CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};

// Input validation middleware
const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Set validation rules
const setValidationRules = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Name must be between 1 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters'),
    validateInput
];

// Card validation rules for creation
const cardCreationRules = [
    body('question')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Question must be between 1 and 1000 characters'),
    body('answer')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Answer must be between 1 and 1000 characters'),
    validateInput
];

// Card validation rules for updates
const cardUpdateRules = [
    body('question')
        .optional()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Question must be between 1 and 1000 characters'),
    body('answer')
        .optional()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Answer must be between 1 and 1000 characters'),
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),
    validateInput
];

// ID validation rules
const idValidationRules = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    validateInput
];

// Apply security middleware
const applySecurityMiddleware = (app) => {
    app.use(helmet()); // Security headers
    app.use(cors(corsOptions)); // CORS protection
    app.use(limiter); // Rate limiting
};

module.exports = {
    applySecurityMiddleware,
    setValidationRules,
    cardCreationRules,
    cardUpdateRules,
    idValidationRules
}; 