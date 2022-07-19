module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostCategories', {
      postId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'BlogPosts',
          id: 'id'
        },
      },
      categoryId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'Categories',
          id: 'id'
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostCategories');
  }
};