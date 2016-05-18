/**
 * Created by Uros Zivaljevic on 5/17/16.
 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        city: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Review, {as: 'reviews', foreignKey: 'authorId'});
            }
        }
    });
    return User;
};