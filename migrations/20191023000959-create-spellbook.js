'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spellbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      knownSpells: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cantrips: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      l1slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l2slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l3slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l4slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l5slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l6slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l7slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l8slots: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      l9slots: {
        defaultValue: 0,
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
    return queryInterface.dropTable('spellbooks');
  }
};