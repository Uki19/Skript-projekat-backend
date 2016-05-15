'use strict';
module.exports = function(sequelize, DataTypes) {
  var field = sequelize.define('field', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return field;
};