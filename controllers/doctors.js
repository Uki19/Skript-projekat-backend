/**
 * Created by Uros Zivaljevic on 5/17/16.
 */

var models = require('../models');

var routes = {
    doctors: '/doctors',
    doctor: '/doctors/:id',
    doctorReviews: '/doctors/:id/reviews'
}

function getDoctors(req, res, next) {
    models.Doctor.findAll({
            include: [{
                model: models.Review,
                as: 'reviews'
            }]
        })
        .then(function (doctors) {
            res.json(doctors);
        });
}

function getDoctor(req, res, next) {
    models.Doctor.findById(req.params.id)
        .then(function (doctor) {
            res.json(doctor);
        });
}

function postDoctor(req, res, next) {
    models.Doctor.create({
            name: req.body.name,
            description: req.body.description,
            ordinationId: req.body.ordinationId
        })
        .then(function (doctor) {
            res.json(doctor);
        });
}

function getDoctorReviews(req, res, next) {
    models.Review.findAll({
            where: {
                doctorId: req.params.id
            }
        })
        .then(function (reviews) {
            res.json(reviews);
        });
}

function postDoctorReview(req, res, next) {
    models.Review.create({
            doctorId: req.params.id,
            title: req.body.title,
            comment: req.body.comment,
            stars: req.body.stars
        })
        .then(function (review) {
            res.json(review);
        });
}

module.exports.init = function (router) {
    router.get(routes.doctors, getDoctors);
    router.post(routes.doctors, postDoctor);
    router.get(routes.doctor, getDoctor);
    router.get(routes.doctorReviews, getDoctorReviews);
    router.post(routes.doctorReviews, postDoctorReview);
}