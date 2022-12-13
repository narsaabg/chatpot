const path = require('path');
const express = require('express');
const env = require('dotenv').config();
const app = express();
const router = express.Router();

//require methods
const {getResponse} = require('./openAIMethods');

//env variables
const port = process.env.PORT;
const apiKey = process.env.OPENAI_API_KEY;

// accept data 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// create a static pages path
app.use(express.static(path.join(__dirname,'public')));

// create routes
router.post('/get-response',getResponse);

// use routes
app.use('/openai',router);

app.listen(port,res=>console.log(`app is running on ${port} Port`));