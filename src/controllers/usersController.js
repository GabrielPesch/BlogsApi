const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const authService = require('../services/authService');
const usersService = require('../services/usersService');

const usersController = {
/** @type {import('express').RequestHandler} */
  async add(req, res) {
    await usersService.validateBodyAdd(req.body);
    const user = await usersService.findOrCreate(req.body);
    const token = await authService.makeToken(user);
    res.status(201).json({ token });
  },

/** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    await authorizationMiddleware.validate(req.headers.authorization);
    const users = await usersService.getAll();
    res.json(users);
  },

/** @type {import('express').RequestHandler} */
  async get(req, res) {
    const [{ id }] = await Promise.all([
      await usersService.validateParamsId(req.params),
      await authorizationMiddleware.validate(req.headers.authorization),
    ]);
    const user = await usersService.findById(id);
    res.json(user);
  },
};

module.exports = usersController;