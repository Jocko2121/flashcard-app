const errorHandler = (err, req, res, next) => {
    console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        params: req.params,
        body: req.body
    });

    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message,
            details: {
                params: req.params,
                body: req.body
            }
        });
    }

    // Handle not found errors
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: 'Not Found',
            message: err.message
        });
    }

    // Handle database errors
    if (err.name === 'DatabaseError') {
        return res.status(500).json({
            error: 'Database Error',
            message: 'An error occurred while accessing the database'
        });
    }

    // Default error
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong!'
    });
};

module.exports = errorHandler; 