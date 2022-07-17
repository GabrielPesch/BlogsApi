const { Router } = require('express');
const usersController = require('../controllers/usersController');

const userRoute = Router();

userRoute.get('/:id', usersController.get);
userRoute.post('/', usersController.add);
userRoute.get('/', usersController.getAll);

module.exports = userRoute;