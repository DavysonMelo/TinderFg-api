const express = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();


routes.post('/user', UserController.store);

routes.post('/login', LoginController.index);

routes.get('/users/search', UserController.index);

routes.post('/user/:targetId/likes', LikeController.store);

module.exports = routes;