const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRoute = Router();

postsRoute.post('/', postsController.add);

module.exports = postsRoute;