const Joi = require('joi');
const { sequelize, BlogPost, PostCategory } = require('../database/models');
const { runSchema } = require('../middlewares/validator');

const postsService = {

  async create({ title, content, userId, categoryIds }) {
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({
        title,
        content,
        userId, 
      }, { transaction: t },
       { raw: true });
      await PostCategory.bulkCreate(
        categoryIds.map((categoryId) => ({
        postId: post.id,
        categoryId,
        })), { transaction: t },
      );
      return post;
    });
    return result;
  },

  validateBodyAdd: runSchema(
    Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
      categoryIds: Joi.array().required(),
    }).messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  ),
};

module.exports = postsService;