const express = require('express');
const path = require('path');
const minimist = require('minimist');
const app = express();

// Parse command line arguments using minimist
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;  // Default to 3000 if no port is specified

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'http-server')));

// Serve the registration page
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'http-server', 'index.html'));
});

// Route for the home page (optional, depending on your needs)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'http-server', 'home.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
