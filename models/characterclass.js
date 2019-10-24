'use strict';
module.exports = (sequelize, DataTypes) => {
  const characterclass = sequelize.define('characterclass', {
    name: DataTypes.STRING,
    spellcastingId: DataTypes.INTEGER,
    apiReference: DataTypes.STRING
  }, {});
  characterclass.associate = function(models) {
    // associations can be defined here
    models.characterclass.belongsToMany(models.spell, { through: 
    'spellsCharacterclasses' });
    models.characterclass.hasMany(models.character);
  };
  return characterclass;
};