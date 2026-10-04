const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('<h1>Student Portal v2</h1>'));
module.exports = app;