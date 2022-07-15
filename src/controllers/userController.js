const authService = require('../services/authService');
const usersService = require('../services/usersService');

const userController = {
/** @type {import('express').RequestHandler} */
  async add(req, res) {
    await usersService.validateBodyAdd(req.body);
    const { email } = req.body;
    const user = await usersService.findOrCreate(email);
    const token = await authService.makeToken(user);
    res.status(201).json({ token });
  },
};

module.exports = userController;