const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Definir la ruta para archivos estáticos
app.use(express.static('src/public'));

module.exports = app;