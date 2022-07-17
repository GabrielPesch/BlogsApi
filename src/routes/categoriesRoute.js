const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');

const categoriesRoute = Router();

categoriesRoute.post('/', categoriesController.add);
categoriesRoute.get('/', categoriesController.getAll);

module.exports = categoriesRoute;