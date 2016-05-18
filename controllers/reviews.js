/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
var models = require('../models');

var routes = {
    reviews: '/reviews',
    review: '/reviews/:id'
}

function getReviews(req, res, next) {
    models.Review.find()
        .then(function (reviews) {
            res.json(reviews);
        });
}

function getReview(req, res, next) {
    models.Review.findById(req.params.id)
        .then(function (review) {
            res.json(review);
        })
}

module.exports.init = function (router) {
    router.get(routes.reviews, getReviews);
    router.get(routes.review, getReview);
}