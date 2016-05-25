/**
 * Created by Uros Zivaljevic on 5/18/16.
 */

var models = require('../models/');

var routes = {
    ordinations: '/ordinations',
    ordination: '/ordination/:id'
}

function getOrdinations(req, res, next) {
    models.Ordination.findAll()
        .then(function (ordinations) {
            res.json(ordinations);
        });
}

function getOrdination(req, res, next) {
    models.Ordination.findById(req.params.id)
        .then(function (ordination) {
            res.json(ordination);
        })
}

module.exports.init = function (router) {
    router.get(routes.ordinations, getOrdinations);
    router.get(routes.ordination, getOrdination);
}