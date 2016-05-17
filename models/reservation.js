'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    reservationNumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Reservation.belongsTo(models.Field);
        Reservation.belongsTo(models.Period);
      }
    }
  });
  return Reservation;
};