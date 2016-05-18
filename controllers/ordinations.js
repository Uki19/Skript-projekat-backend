/**
 * Created by Uros Zivaljevic on 5/18/16.
 */

var routes = {
    ordinations: '/ordinations',
    ordination: '/ordination'
}

function getOrdinations(req, res, next) {
    models.Ordination.find()
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