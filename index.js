const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path module
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


//COSAS QUE NO SE QUE HACEN :D
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());app.use(express.json());app.use(express.urlencoded({ extended: true }));app.use(express.static(path.join(__dirname, 'public')));

// ENDPOINTS ACA ABAJO :3

app.get('/jamon', async (req, res) => {
  try{
    res.status(200).send({"msg": "jamon con espinaca q rico"})
    }catch(e){
      res.status(500).send({'error': 'Internal server error'})
const express = require('express')
const cors = require('cors');
const path = require('path'); // Import path module
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


//COSAS QUE NO SE QUE HACEN :D
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());app.use(express.json());app.use(express.urlencoded({ extended: true }));app.use(express.static(path.join(__dirname, 'public')));


// ENDPOINTS ACA ABAJO :3
app.get('/jamon', async (req, res) => {
  try{
    res.status(200).send({"msg": "jamon con espinaca q rico"})
    }catch(e){
      res.status(500).send({'error': 'Internal server error'})
    }
})

app.post('/recetas', async (req, res) => {
  try{
    res.status(200).send({
      "queso con": req.body
    })
  }catch(e){
    res.status(500).send({'error': 'Internal server error'})
  }
})

//Avisa en consola donde esta el server
app.listen(port, () => {
  console.log(`La cocina esta en http://localhost:${port}`);
});
    }
})