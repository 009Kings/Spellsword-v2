'use strict';
module.exports = (sequelize, DataTypes) => {
  const spell = sequelize.define('spell', {
    description: DataTypes.TEXT,
    higherLevel: DataTypes.TEXT,
    reference: DataTypes.STRING,
    range: DataTypes.STRING,
    components: DataTypes.STRING,
    material: DataTypes.STRING,
    ritual: DataTypes.BOOLEAN,
    duration: DataTypes.STRING,
    concentration: DataTypes.BOOLEAN,
    castingTime: DataTypes.STRING,
    level: DataTypes.INTEGER,
    schoolId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  spell.associate = function(models) {
    // associations can be defined here
    models.spell.belongsToMany(models.characterclass, { through: 'spellsCharacterclasses' });
    models.spell.belongsToMany(models.spellbook, { through: 'spellsSpellbooks' });
    models.spell.belongsTo(models.school);
  };
  return spell;
};