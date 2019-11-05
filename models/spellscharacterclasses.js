'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellsCharacterclasses = sequelize.define('spellsCharacterclasses', {
    spellId: DataTypes.INTEGER,
    characterclassId: DataTypes.INTEGER
  }, {});
  spellsCharacterclasses.associate = function(models) {
    // associations can be defined here
  };
  return spellsCharacterclasses;
};