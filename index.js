const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const recetas = require('./recetas');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/**********************************
*para el trabajo de comunicaciones*
***********************************/
app.get('/jamon', async (req, res) => {
  try {
    res.status(200).send({ "msg": "jamon con espinaca q rico" });
  } catch (e) {
    res.status(500).send({ 'error': 'Internal server error' });
  }
});

app.post('/recetas', async (req, res) => {
  try {
    res.status(200).send({
      "queso con": req.body
    });
  } catch (e) {
    res.status(500).send({ 'error': 'Internal server error' });
  }
});

/****************************************
 * Búsqueda de Recetas
****************************************/

// Endpoint para buscar recetas
app.post('/buscar-recetas', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm; // Obtener el término de búsqueda del cuerpo de la solicitud
    const recetasArray = recetas.leerRecetas(); // Utilizar la función leerRecetas del módulo recetas

    // Filtrar recetas que coincidan con el término de búsqueda
    const recetasCoincidentes = recetasArray.filter(receta => receta.contenido.toLowerCase().includes(searchTerm.toLowerCase()));

    res.status(200).send(recetasCoincidentes);
  } catch (e) {
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
