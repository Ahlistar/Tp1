const marked = require('marked');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for searching recipes
app.get('/search', (req, res) => {
    const searchTerm = req.query.q;

    // Read files from the /recetas folder
    fs.readdir(path.join(__dirname, '/recetas'), (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Array to store search results
        const searchResults = [];

        // Iterate through each file in the folder
        files.forEach(file => {
            // Read the contents of each Markdown file
            fs.readFile(path.join(__dirname, '/recetas', file), 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                // Check if the file content contains the search term
                if (data.toLowerCase().includes(searchTerm.toLowerCase())) {
                    // Convert Markdown content to HTML
                    const htmlContent = marked(data);
                    searchResults.push({ filename: file, content: htmlContent });
                }

                // If this is the last file, redirect to the search results page
                if (searchResults.length === files.length) {
                    res.redirect(`/search-results?q=${encodeURIComponent(searchTerm)}`);
                }
            });
        });
    });
});

// Define endpoint for serving the search results page
app.get('/search-results', (req, res) => {
    const searchTerm = req.query.q;
    // Render the search results page with the search term
    res.sendFile(path.join(__dirname, 'public', 'search-results.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`La cocina esta en http://localhost:${port}`);
});
