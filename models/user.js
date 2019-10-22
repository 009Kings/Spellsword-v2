'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 32],
          msg: 'Must be between 8 and 32 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options) {
        if(pendingUser && pendingUser.password) {
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });

  user.associate = function(models) {
    // associations can be defined here
  };

  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };

  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
};