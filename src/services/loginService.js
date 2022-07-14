const Joi = require('joi');
const { runSchema } = require('../middlewares/validator');

const loginService = {
  validateBodyLogin: runSchema(
    Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
    }).required().messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  ),
  
};

module.exports = loginService;