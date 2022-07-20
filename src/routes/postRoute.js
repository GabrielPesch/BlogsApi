const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRoute = Router();

postsRoute.get('/search', postsController.search);
postsRoute.delete('/:id', postsController.remove);
postsRoute.put('/:id', postsController.edit);
postsRoute.get('/:id', postsController.getById);
postsRoute.post('/', postsController.add);
postsRoute.get('/', postsController.getAll);

module.exports = postsRoute;