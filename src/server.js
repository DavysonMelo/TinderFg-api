const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect(
    'mongodb+srv://user:pass@cluster0-49yqn.mongodb.net/tinderFG?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

server.use(express.json());
server.use(routes);

server.listen(3333);