const { DataTypes }= require('sequelize');

/**@type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
}

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', attributes, {
    timestamps: false,
    tableName: 'Categories'});
  return Category;
};