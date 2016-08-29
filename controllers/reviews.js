/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
var models = require('../models');

var routes = {
    reviews: '/reviews',
    review: '/reviews/:id'
}

function getReviews(req, res, next) {
    models.Review.findAll({
            include: [{
                model: models.User,
                as: 'author'
            }]
        })
        .then(function (reviews) {
            res.status(200).json(reviews);
        });
}

function getReview(req, res, next) {
    models.Review.findById(req.params.id, {
            include: [{
                model: models.User,
                as: 'author'
            }]
        })
        .then(function (review) {
            res.status(200).json(review);
        })
}

module.exports.init = function (router) {
    router.get(routes.reviews, getReviews);
    router.get(routes.review, getReview);
}