'use strict';
module.exports = function (sequelize, DataTypes) {
    var Doctor = sequelize.define('Doctor', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,

    
    }, {
        classMethods: {
            associate: function (models) {
                Doctor.hasMany(models.Review, {as: 'reviews', foreignKey:'doctorId'});
                Doctor.belongsTo(models.Ordination, {as: 'ordination', foreignKey:'ordinationId'});
                Doctor.belongsToMany(models.Category, {through: 'DoctorCategory', foreignKey: 'doctorId'});
            }
        }
    });
    return Doctor;
};