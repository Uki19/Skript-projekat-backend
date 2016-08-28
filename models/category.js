/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
'use strict';
module.exports = function(sequelize, DataTypes){
    var Category = sequelize.define('Category',{
        name: DataTypes.STRING
    },{
        timestamps: false,
        classMethods: {
            associate: function(models){
                Category.belongsToMany(models.Doctor, {through: 'DoctorCategory', as: 'doctors', foreignKey:'categoryId'});
            }
        }
    });
    return Category;
}