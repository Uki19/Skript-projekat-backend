'use strict';
module.exports = function(sequelize, DataTypes) {
  var Field = sequelize.define('Field', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    workingFrom: DataTypes.STRING,
    workingTo: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Field.hasMany(models.Reservation, {as: 'reservations'});
      }
    }
  });
  return Field;
};