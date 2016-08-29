/**
 * Created by Uki on 8/29/16.
 */
'use strict';
module.exports = function(sequelize, DataTypes){
    var Reservation = sequelize.define('Reservation',{
    },{
        timestamps: false,
        classMethods: {
            associate: function(models){
                Reservation.belongsTo(models.Doctor, {as: 'doctor', foreignKey: 'doctorId'});
                Reservation.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
                Reservation.belongsTo(models.Hour, {as: 'hour', foreignKey: 'hourId'});
            }
        }
    });
    return Reservation;
}