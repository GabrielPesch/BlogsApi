const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRoute = Router();

postsRoute.post('/', postsController.add);
postsRoute.get('/', postsController.getAll);

module.exports = postsRoute;