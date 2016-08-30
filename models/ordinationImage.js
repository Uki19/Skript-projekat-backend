/**
 * Created by Uki on 8/30/16.
 */
'use strict';
module.exports = function(sequelize, DataTypes){
    var OrdinationImage = sequelize.define('OrdinationImage',{
        url: DataTypes.STRING
    },{
        timestamps: false,
        classMethods: {
            associate: function(models){
                OrdinationImage.belongsTo(models.Ordination, {as: 'ordination', foreignKey: 'ordinationId'});
            }
        }
    });
    return OrdinationImage;
}