const rateLimit = require('express-rate-limit');
const { body, param, validationResult } = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');
const { ValidationError } = require('./error-handler');

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
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
        const error = errors.array()[0];
        // Check if it's an ID validation error
        if (error.param === 'id' || error.param === 'setId' || error.param === 'cardId') {
            throw new ValidationError('Resource not found');
        }
        throw new ValidationError(error.msg);
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
        .withMessage('Resource not found'),
    validateInput
];

// Apply security middleware
const applySecurityMiddleware = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"]
            }
        }
    })); // Security headers
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