const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints
app.get('/recetas/jamon', async (req, res) => {
  try {
    res.status(200).json({ message: "¡Jamon con espinaca, qué rico!" });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/recetas', async (req, res) => {
  try {
    const { ingredientes } = req.body;
    res.status(200).json({ mensaje: `Receta recibida con ingredientes: ${ingredientes}` });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
