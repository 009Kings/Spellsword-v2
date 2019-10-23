'use strict';
module.exports = (sequelize, DataTypes) => {
  const school = sequelize.define('school', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  school.associate = function(models) {
    // associations can be defined here
  };
  return school;
};