const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const categoriesService = require('../services/categoriesService');

const categoriesController = {
  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    await Promise.all([
      await categoriesService.validateBodyAdd(req.body),
      await authorizationMiddleware.validate(req.headers.authorization),
    ]);
    const category = await categoriesService.findOrCreate(req.body);
    res.status(201).json(category);
  },

  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    await authorizationMiddleware.validate(req.headers.authorization);
    const categories = await categoriesService.getAll();
    res.json(categories);
  },
};

module.exports = categoriesController;