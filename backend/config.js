const path = require('path');

// Environment variables with defaults
const env = process.env.NODE_ENV || 'development';
const port = parseInt(process.env.PORT || '3000', 10);

// Validate port number
if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('Invalid port number. Must be between 1 and 65535');
}

// Base configuration
const config = {
    env,
    port,
    dataPath: path.join(__dirname, 'data.json'),
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
};

// Environment-specific configuration
const envConfig = {
    development: {
        logLevel: 'debug',
        testMode: false
    },
    test: {
        logLevel: 'error',
        testMode: true,
        dataPath: path.join(__dirname, 'test-data.json')
    },
    production: {
        logLevel: 'info',
        testMode: false
    }
};

// Merge environment-specific config with base config
Object.assign(config, envConfig[env] || envConfig.development);

// Export configuration
module.exports = config; 