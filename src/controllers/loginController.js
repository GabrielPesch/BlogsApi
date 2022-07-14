const authService = require('../services/authService');
const loginService = require('../services/loginService');
const usersService = require('../services/usersService');

const loginController = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    await loginService.validateBodyLogin(req.body);
    const user = await usersService.VerifyEmailAndPassword(req.body);
    const token = await authService.makeToken(user);
    res.json({ token });
  },
};

module.exports = loginController;