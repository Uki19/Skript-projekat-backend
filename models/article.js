/**
 * Created by Uki on 8/29/16.
 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                Article.belongsTo(models.Doctor, {as: 'doctor', foreignKey:'doctorId'});
            }
        }
    });
    return Article;
};