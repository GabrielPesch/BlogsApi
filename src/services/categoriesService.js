const Joi = require('joi');
const { Category } = require('../database/models');
const { runSchema } = require('../middlewares/validator');
const serviceUtils = require('./utils');

const categoriesService = {

  async findOrCreate(data) {
    const [category, created] = await Category.findOrCreate({
      where: { name: data.name },
      raw: true,
      defaults: data,
    });
    if (!created) serviceUtils.throwCategoryExists('Category already registered');
    return category;
  },

  async getAll() {
    const categories = await Category.findAll();
    return categories;
  },

  validateBodyAdd: runSchema(
    Joi.object({
      name: Joi.string().required().max(255),
    }),
  ),
};

module.exports = categoriesService;