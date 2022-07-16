const { Router } = require('express');
const usersController = require('../controllers/usersController');

const userRoute = Router();

userRoute.post('/', usersController.add);
userRoute.get('/', usersController.getAll);

module.exports = userRoute;