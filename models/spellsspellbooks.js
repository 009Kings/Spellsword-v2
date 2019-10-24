'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellsSpellbooks = sequelize.define('spellsSpellbooks', {
    spellId: DataTypes.INTEGER,
    spellbookId: DataTypes.INTEGER,
    exceptionAdd: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  }, {});
  spellsSpellbooks.associate = function(models) {
    // associations can be defined here
  };
  return spellsSpellbooks;
};