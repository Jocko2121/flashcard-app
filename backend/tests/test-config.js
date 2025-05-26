const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

// Helper to reload config after changing env vars
function loadFreshConfig() {
    delete require.cache[require.resolve('../config')];
    return require('../config');
}

describe('Configuration', () => {
    it('should load basic configuration', () => {
        // Temporarily set environment variables
        process.env.PORT = '3001';
        process.env.NODE_ENV = 'test';
        
        // Load config
        const config = loadFreshConfig();
        
        // Verify basic config values
        expect(config.port).to.equal(3001);
        expect(config.env).to.equal('test');
        expect(config.dataPath).to.be.a('string');
        expect(fs.existsSync(config.dataPath)).to.be.true;
    });

    it('should use default values', () => {
        // Clear environment variables
        delete process.env.PORT;
        delete process.env.NODE_ENV;
        
        // Load config
        const config = loadFreshConfig();
        
        // Verify default values
        expect(config.port).to.equal(3000);
        expect(config.env).to.equal('development');
    });

    it('should load environment-specific config', () => {
        // Set environment to test
        process.env.NODE_ENV = 'test';
        
        // Load config
        const config = loadFreshConfig();
        
        // Verify test environment settings
        expect(config.env).to.equal('test');
        expect(config.testMode).to.be.true;
    });

    it('should validate configuration', () => {
        // Set invalid port
        process.env.PORT = 'invalid';
        
        // Verify that loading config throws error
        expect(() => {
            loadFreshConfig();
        }).to.throw('Invalid port number');
        
        // Clean up
        delete process.env.PORT;
    });
}); 