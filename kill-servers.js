const { exec } = require('child_process');

// Function to kill all Node.js processes
function killNodeServers() {
    console.log('Searching for Node.js processes...');
    
    // For Windows
    if (process.platform === 'win32') {
        exec('taskkill /F /IM node.exe', (error, stdout, stderr) => {
            if (error) {
                console.log('No Node.js processes found or error:', error.message);
                return;
            }
            console.log('Successfully terminated all Node.js processes');
        });
    } 
    // For Unix-like systems (Linux/Mac)
    else {
        exec('pkill -f node', (error, stdout, stderr) => {
            if (error) {
                console.log('No Node.js processes found or error:', error.message);
                return;
            }
            console.log('Successfully terminated all Node.js processes');
        });
    }
}

killNodeServers(); 