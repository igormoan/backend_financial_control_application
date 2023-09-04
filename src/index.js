require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

app.use(routes);

app.use('*', (req, res) => {
    res.status(404).json({error: 'URL inválida'});
  });

app.listen(process.env.PORT);