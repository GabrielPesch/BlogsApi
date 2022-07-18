const { DataTypes }= require('sequelize');

/**@type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      id: 'id'
    }
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE
  }
}

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attributes, {
    timestamps: true,
    tableName: 'BlogPosts',
    createdAt: "published",
    updatedAt: 'updated'
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {foreignKey: 'userId', as: 'user' })
  }
  return BlogPost;
};