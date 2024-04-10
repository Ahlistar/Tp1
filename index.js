const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/jamon', async (req, res) => {
    try {
        res.status(200).json({ msg: "jamon con espinaca q rico" });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/recetas', async (req, res) => {
    try {
        const { body } = req;
        res.status(200).json({ "queso con": body });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`La cocina esta en http://localhost:${PORT}`);
});