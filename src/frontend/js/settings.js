// Kill Servers functionality
document.getElementById('killServersBtn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to kill all running servers? This will stop all Node.js processes.')) {
        try {
            const response = await fetch('/api/settings/kill-servers', {
                method: 'POST'
            });
            
            if (response.ok) {
                alert('All servers have been terminated. Please restart the application.');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                throw new Error('Failed to kill servers');
            }
        } catch (error) {
            // If we get a connection refused error, it likely means the server was successfully killed
            if (error.message.includes('Failed to fetch') || error.message.includes('Connection refused')) {
                alert('Servers have been terminated. Please restart the application.');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                console.error('Error killing servers:', error);
                alert('Failed to kill servers. Please try again or use the terminal command.');
            }
        }
    }
}); 