/**
 * Created by Uros Zivaljevic on 5/17/16.
 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define('Review', {
        title: DataTypes.STRING,
        comment: DataTypes.STRING,
        stars: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                Review.belongsTo(models.Doctor, {as: 'doctor', foreignKey: 'doctorId'});
                Review.belongsTo(models.User, {as: 'author', foreignKey: 'authorId'});
            }
        }
    });
    return Review;
};