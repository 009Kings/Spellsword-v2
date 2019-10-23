'use strict';
module.exports = (sequelize, DataTypes) => {
  const character = sequelize.define('character', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    characterclassId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    image: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {});
  character.associate = function(models) {
    // associations can be defined here
  };
  return character;
};