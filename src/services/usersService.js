const Joi = require('joi');
const { User } = require('../database/models');
const { runSchema } = require('../middlewares/validator');
const serviceUtils = require('./utils');

const usersService = {
  async verifyEmailAndPassword(data) {
    const user = await User.findOne({
      where: data,
      raw: true,
    });
    if (!user) serviceUtils.throwInvalidFields('Invalid fields');
    return user;
  },

  async findOrCreate(data) {
    const [{ dataValues: user }, created] = await User.findOrCreate({
      where: { email: data.email },
      raw: true,
      defaults: data,
    });
    if (!created) serviceUtils.throwUserExists('User already registered');
    const { password: _, ...restOfUser } = user;
    return restOfUser;
  },

  validateBodyAdd: runSchema(
    Joi.object({
      displayName: Joi.string().min(8).required().max(255),
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6).max(255)
.messages({
        'string.min': '"password" length must be at least 6 characters long',
      }),
      image: Joi.string().required().max(255),
    }),
  ),
};

module.exports = usersService;