/**
 * Created by Uros Zivaljevic on 5/15/16.
 */

var models = require('../models');

var routes = {
    fields: "/fields",
    field: "/fields/:id"
}

function getFields(req, res, next){
    models.Field.findAll({
        include: {
            model: models.Reservation,
            as: 'reservations'
        }
    })
        .then(function(fields){
            res.json(fields);
        });
}

function getField(req, res, next){
    models.Field.findById(req.params.id)
        .then(function (field) {
            res.json(field);
    })
}

function addField(req, res, next) {

}

module.exports.init = function(router) {
    router.get(routes.fields, getFields);
    router.get(routes.field, getField);
}
