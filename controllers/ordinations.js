/**
 * Created by Uros Zivaljevic on 5/18/16.
 */

var models = require('../models/');

var routes = {
    ordinations: '/ordinations',
    ordination: '/ordinations/:id',
    ordinationsLatest: '/latestOrdinations'
};

function getLatestOrdinations(req, res, next) {
    models.Ordination.findAll({
        include: [
            {
                model: models.OrdinationImage,
                as: 'images'
            }
        ],
        limit: 4,
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function (ordinations) {
            res.status(200).json(ordinations);
        });
}

function getOrdinations(req, res, next) {
    models.Ordination.findAll({
        include: [
            {
                model: models.OrdinationImage,
                as: 'images'
            }
        ]
    })
        .then(function (ordinations) {
            res.status(200).json(ordinations);
        });
}

function getOrdination(req, res, next) {
    models.Ordination.findById(req.params.id, {
        include: [
            {
                model: models.Doctor,
                as: 'doctors',
                include: [{
                    model: models.Category,
                    as: 'category'
                    }
                ]
            },
            {
                model: models.OrdinationImage,
                as: 'images'
            }
        ]
    })
        .then(function (ordination) {
            res.status(200).json(ordination);
        })
}

function postOrdination(req, res, next) {
    models.Ordination.create({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city
        })
        .then(function (ordination) {
            res.status(201).json(ordination);
        });
}

module.exports.init = function (router) {
    router.get(routes.ordinations, getOrdinations);
    router.get(routes.ordination, getOrdination);
    router.get(routes.ordinationsLatest, getLatestOrdinations);
    router.post(routes.ordinations, postOrdination);
};