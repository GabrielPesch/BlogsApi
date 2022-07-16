const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { runSchema } = require('../middlewares/validator');
const { throwTokenNotFound, throwUnauthorizedError } = require('./utils');

const secret = process.env.JWT_SECRET || 'secret';

const authService = {
  async makeToken(user) {
    const { password, ...restOfUser } = user;
    const token = jwt.sign({ data: restOfUser }, secret);
    return token;
  },

  async readToken(token) {
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch (error) {
      throwUnauthorizedError('Expired or invalid token');
    }
  },

  async validateAuthorization(unknown) {
    const schema = Joi.string().required();
    try {
      const result = await runSchema(schema)(unknown);
      return result;
    } catch (error) {
      throwTokenNotFound('Token not found');
    }
  },
};

module.exports = authService;