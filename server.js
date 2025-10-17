const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to remove .html extension and add trailing slash
app.use((req, res, next) => {
    // If URL has .html extension, redirect to version without it
    if (req.path.endsWith('.html')) {
        const newPath = req.path.slice(0, -5);
        return res.redirect(301, newPath);
    }
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Handle all routes - serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all for any other routes - try to serve .html file
app.get('*', (req, res) => {
    let filePath = path.join(__dirname, req.path);

    // If path doesn't have an extension, try adding .html
    if (!path.extname(filePath)) {
        filePath = filePath + '.html';
    }

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, 'index.html'));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
