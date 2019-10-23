'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellbook = sequelize.define('spellbook', {
    characterId: DataTypes.INTEGER,
    knownSpells: DataTypes.INTEGER,
    cantrips: DataTypes.INTEGER,
    l1slots: DataTypes.INTEGER,
    l2slots: DataTypes.INTEGER,
    l3slots: DataTypes.INTEGER,
    l4slots: DataTypes.INTEGER,
    l5slots: DataTypes.INTEGER,
    l6slots: DataTypes.INTEGER,
    l7slots: DataTypes.INTEGER,
    l8slots: DataTypes.INTEGER,
    l9slots: DataTypes.INTEGER
  }, {});
  spellbook.associate = function(models) {
    // associations can be defined here
  };
  return spellbook;
};