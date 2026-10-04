const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('<h1>Student Portal v1</h1>'));
module.exports = app;