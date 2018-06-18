// Starting point of the application

const http = require('http');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth');
const app = express();

const router = require('./router');
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server is running on port = ${port}`);