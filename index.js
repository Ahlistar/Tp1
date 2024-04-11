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

    // Build the HTML response
    let responseHTML = `
        <html>
        <head>
            <title>Resultados :3</title>
            <style>
                /* CSS styles for the search results page */
                body {
                    font-family: Arial, sans-serif;
                    background-image: url('fondobusqueda.jpg'); /* Adjust the path as needed *
                    background-position: center;
                    color: #333; /* Text color */
                    margin: 0;
                    padding: 0;
                }
                h2 {
                    padding: 20px;
                    font-family:  'GreatVictorian', Arial, sans-serif;
                    font-size: 90px;
                    text-shadow: 0 0 30px #ffffff, 0 0 30px #ffffff; 
                    margin-bottom: 0; 
                }
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 20px;
                }
                li {
                    padding: 10px;
                    margin-bottom: 10px;
                    background-color: #faebd7; /* Light gray background for each list item */
                    border-radius: 5px;
                }
                a {
                    text-decoration: none;
                    color: #0066cc;
                }
                a:hover {
                    text-decoration: underline;
                }
                h2 {
                    
                }

            </style>
            <link rel="stylesheet" href="searchstyles.css">
        </head>
        <body>
            <h2>Resultadis :b</h2>
            <ul>
    `;

    // Add matching recipes as list items with links to full recipes
    matchingRecipes.forEach(recipe => {
        responseHTML += `<li><a href="/recipe/${recipe.name}">${recipe.name}</a></li>`;
    });

    // Close the HTML structure
    responseHTML += `
            </ul>
        </body>
        </html>
    `;

    // Send the HTML response
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
