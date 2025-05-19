// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Default error status and message
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        status = 400;
        message = err.message || 'Invalid input data';
    } else if (err.name === 'NotFoundError') {
        status = 404;
        message = err.message || 'Resource not found';
    }

    // Always send a properly formatted error response
    res.status(status).json({
        error: message
    });
};

// Custom error classes
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.status = 400;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

// Export middleware and error classes
module.exports = {
    errorHandler,
    ValidationError,
    NotFoundError
}; 