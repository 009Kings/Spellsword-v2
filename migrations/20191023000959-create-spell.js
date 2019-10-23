'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      higherLevel: {
        type: Sequelize.TEXT
      },
      reference: {
        type: Sequelize.STRING
      },
      range: {
        allowNull: false,
        type: Sequelize.STRING
      },
      components: {
        allowNull: false,
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      ritual: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      duration: {
        allowNull: false,
        type: Sequelize.STRING
      },
      concentration: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      castingTime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      level: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      schoolId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('spells');
  }
};