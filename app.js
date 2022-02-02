const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get('/', (req, res) => [
    res.send('Home page, baby!')
])

app.get('/other', (req, res) => {
    res.send('Other page')
})

app.listen(3000);