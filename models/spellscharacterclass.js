'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellsCharacterclass = sequelize.define('spellsCharacterclass', {
    spellId: DataTypes.INTEGER,
    characterclass: DataTypes.INTEGER
  }, {});
  spellsCharacterclass.associate = function(models) {
    // associations can be defined here
  };
  return spellsCharacterclass;
};