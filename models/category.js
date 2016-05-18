/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
'use strict';
module.exports = function(sequelize, DataTypes){
    var Category = sequelize.define('Category',{
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    },{
        classMethods: {
            associate: function(models){
                Category.belongsToMany(models.Doctor, {through: 'DoctorCategory', foreignKey:'categoryId'});
            }
        }
    });
    return Category;
}