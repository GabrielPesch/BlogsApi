const { DataTypes }= require('sequelize');

/**@type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  displayName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
}

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
module.exports = (sequelize) => {
  const User = sequelize.define('User', attributes, {
    timestamps: false,
    tableName: 'Users'});

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { key: 'userId', as: 'BlogPosts' })
  }
  return User;
};