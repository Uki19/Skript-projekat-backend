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

function postField(req, res, next) {

    var Field = models.Field.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        street: req.body.street,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        workingFrom: req.body.workingFrom,
        workingTo: req.body.workingTo
    })
        .then(function(field){
            res.json(field);
        });

}

module.exports.init = function(router) {
    router.get(routes.fields, getFields);
    router.post(routes.fields, postField);
    router.get(routes.field, getField);
}
