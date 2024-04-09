const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path module
const bodyParser = require('body-parser');



const app = express();
const port = 80;

// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow all cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------- ENDPOINTS --------------------------------------------

/****************************************
 * Business
****************************************/

app.get('/hola', async (req, res) => {
  try{
    res.status(200).send({"msg": "HOLA"})
    }catch(e){
      res.status(500).send({'error': 'Internal server error'})
    }
})


app.post('/jugador', async (req, res) => {
  try{
    res.status(200).send({
      "recibi": req.body
    })
  }catch(e){
    res.status(500).send({'error': 'Internal server error'})
  }
})


app.get('/boom', async (req, res) => {
  res.status(500).json({ message: "My bad" })
})

app.get('/players/salary', async (req, res) => {
  res.status(403).send({
    'error': 'Cannot access this information'
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});