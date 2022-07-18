const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const authService = require('../services/authService');
const categoriesService = require('../services/categoriesService');
const postsService = require('../services/postsService');

const postsController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    await Promise.all([
      await postsService.validateBodyAdd(req.body),
      await authorizationMiddleware.validate(req.headers.authorization),
    ]);
    const { id: userId } = await authService.readToken(req.headers.authorization);
    const { categoryIds } = req.body;
    await categoriesService.checkExistsById(categoryIds);
    const post = await postsService.create({ ...req.body, userId });
    res.status(201).json(post);
  },
  
  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    await authorizationMiddleware.validate(req.headers.authorization);
    const posts = await postsService.getAll();
    res.json(posts);
  },

  /** @type {import('express').RequestHandler} */
  async getById(req, res) {
    const [{ id }] = await Promise.all([
      await postsService.validateParamsId(req.params),
      await authorizationMiddleware.validate(req.headers.authorization),
    ]);
    const post = await postsService.findById(id);
    res.json(post);
  },
};

module.exports = postsController;