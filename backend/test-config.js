const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Helper to reload config after changing env vars
function loadFreshConfig() {
    delete require.cache[require.resolve('./config')];
    return require('./config');
}

// Test helper functions
function runTest(name, testFn) {
    console.log(`\n🧪 Running test: ${name}`);
    try {
        testFn();
        console.log('✅ Test passed');
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        throw error;
    }
}

// Test 1: Basic Configuration Loading
runTest('Basic Configuration Loading', () => {
    // Temporarily set environment variables
    process.env.PORT = '3001';
    process.env.NODE_ENV = 'test';
    
    // Load config
    const config = loadFreshConfig();
    
    // Verify basic config values
    assert.strictEqual(config.port, 3001, 'PORT should be loaded from environment');
    assert.strictEqual(config.env, 'test', 'NODE_ENV should be loaded from environment');
    assert.strictEqual(typeof config.dataPath, 'string', 'dataPath should be a string');
    assert(fs.existsSync(config.dataPath), 'dataPath should point to a valid file');
});

// Test 2: Default Values
runTest('Default Values', () => {
    // Clear environment variables
    delete process.env.PORT;
    delete process.env.NODE_ENV;
    
    // Load config
    const config = loadFreshConfig();
    
    // Verify default values
    assert.strictEqual(config.port, 3000, 'Default PORT should be 3000');
    assert.strictEqual(config.env, 'development', 'Default NODE_ENV should be development');
});

// Test 3: Environment-Specific Config
runTest('Environment-Specific Config', () => {
    // Set environment to test
    process.env.NODE_ENV = 'test';
    
    // Load config
    const config = loadFreshConfig();
    
    // Verify test environment settings
    assert.strictEqual(config.env, 'test', 'Environment should be test');
    assert(config.testMode, 'Test mode should be enabled in test environment');
});

// Test 4: Configuration Validation
runTest('Configuration Validation', () => {
    // Set invalid port
    process.env.PORT = 'invalid';
    
    // Verify that loading config throws error
    assert.throws(() => {
        loadFreshConfig();
    }, /Invalid port number/, 'Should throw error for invalid port');
    // Clean up
    delete process.env.PORT;
});

console.log('\n✨ All configuration tests completed!'); 