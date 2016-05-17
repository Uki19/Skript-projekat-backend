'use strict';
module.exports = function(sequelize, DataTypes) {
  var Period = sequelize.define('Period', {
    from: DataTypes.TIME,
    to: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Period;
};