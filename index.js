const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load recipes from files
const recipes = [];
const recetasFolder = path.join(__dirname, 'recetas');
fs.readdir(recetasFolder, (err, files) => {
    if (err) {
        console.error('Error loading recipes:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(recetasFolder, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const recipeName = file.replace('.html', '');
        
        // Store recipe data in an array
        recipes.push({
            name: recipeName,
            content: content
        });
    });
});

// Define the /search route
app.get('/search', (req, res) => {
    // Get the search query from the request
    const query = req.query.query.toLowerCase();

    // Filter recipes based on the query name
    const matchingRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query)
    );

    // Create an HTML response with the matching recipe names and links to full recipes
    let responseHTML = '<h2>Search Results:</h2><ul>';
    matchingRecipes.forEach(recipe => {
        responseHTML += `<li><a href="/recipe/${recipe.name}">${recipe.name}</a></li>`;
    });
    responseHTML += '</ul>';

    // Send the response
    res.send(responseHTML);
});

// Define the /recipe/:name route
app.get('/recipe/:name', (req, res) => {
    // Get the recipe name from the URL parameter
    const recipeName = req.params.name;

    // Find the matching recipe
    const recipe = recipes.find(recipe => recipe.name === recipeName);

    if (recipe) {
        // Send the full recipe content as the response
        res.send(recipe.content);
    } else {
        // Recipe not found
        res.status(404).send('Recipe not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
