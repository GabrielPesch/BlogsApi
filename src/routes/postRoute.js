const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRoute = Router();

postsRoute.put('/:id', postsController.edit);
postsRoute.get('/:id', postsController.getById);
postsRoute.post('/', postsController.add);
postsRoute.get('/', postsController.getAll);

module.exports = postsRoute;