'use strict';


module.exports = {

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   * @returns 
   */

  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,  
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  })
  },


  async down (queryInterface) {
   await queryInterface.dropTable('users');
  }
};
