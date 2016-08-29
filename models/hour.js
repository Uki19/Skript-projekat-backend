/**
 * Created by Uki on 8/29/16.
 */
'use strict';
module.exports = function(sequelize, DataTypes){
    var Hour = sequelize.define('Hour',{
        time: DataTypes.STRING
    },{
        timestamps: false,
        classMethods: {
            associate: function(models){

            }
        }
    });
    return Hour;
}