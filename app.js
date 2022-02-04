const express = require("express");
const mongoose = require("mongoose");
import axios from "axios";
require('dotenv/config')

const app = express();

app.get('/', (req, res) => {

    res.send('Home page, baby!')
})

app.get('/other', (req, res) => {
    res.send('Other page')
})

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to DB")
})

app.listen(3000);


// node_modules installed: express, mongoose, & nodemon, dotenv

// 1. Create basic express app
// 2. Connect to DB
// 3. Connect to DB using string in .env file