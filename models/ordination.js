/**
 * Created by Uros Zivaljevic on 5/17/16.
 */
'use strict';
module.exports = function(sequelize, DataTypes){
    var Ordiantion = sequelize.define('Ordination',{
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        email:DataTypes.STRING,
        street:DataTypes.STRING,
        city:DataTypes.STRING
    },{
        classMethods: {
            associate: function(models){
                Ordiantion.hasMany(models.Doctor, {as: 'doctors', foreignKey:'ordinationId'});
                Ordiantion.hasMany(models.OrdinationImage, {as: 'images', foreignKey:'ordinationId'});
            }
        }
    });
    return Ordiantion;
};