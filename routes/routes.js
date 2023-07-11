const express = require('express');
const app = express();

// Import route files
const ordineRoute = require('./ordine.js');
const pizzaRoute = require('./pizza.js');
const ingredienteRoute = require('./ingrediente.js');
const menuRoute = require('./menu.js');

// Register route files
app.use('/ordine', ordineRoute);
app.use('/pizza', pizzaRoute);
app.use('/ingrediente', ingredienteRoute);
app.use('/menu', menuRoute);

module.exports = app;