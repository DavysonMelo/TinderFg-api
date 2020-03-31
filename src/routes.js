const express = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();


routes.post('/user', UserController.store);

routes.get('/user/find', LoginController.locate);

routes.post('/login', LoginController.index);

routes.get('/users/search', UserController.index);

module.exports = routes;