const { DataTypes }= require('sequelize');

/**@type {import('sequelize').ModelAttributes} */
const attributes = {
  postId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'BlogPost',
      id: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Category',
      id: 'id'
    }
  }
}

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attributes, {
    timestamps: false,
    tableName: 'PostCategories'
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostCategory,
      foreignKey: 'categoryId', 
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId', 
      otherKey: 'categoryId',
    });
  };
  return PostCategory;
};