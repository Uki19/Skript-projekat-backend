/**
 * Created by Uros Zivaljevic on 5/17/16.
 */

var models = require('../models');

var routes = {
    doctors: '/doctors',
    doctor: '/doctors/:id',
    doctorReviews: '/doctors/:id/reviews',
    categories: '/categories',
    book: '/book',
    doctorReservations: '/doctors/:id/reservations'
}

function getDoctors(req, res, next) {
    models.Doctor.findAll({
        include: [{
            model: models.Review,
            as: 'reviews',
            include: [
                {
                    model: models.User,
                    as: 'author'
                }]
        }]
    })
        .then(function (doctors) {
            res.json(doctors);
        });
}

function getDoctor(req, res, next) {
    models.Doctor.findById(req.params.id, {
        include: [{
            model: models.Review,
            as: 'reviews',
            include: [{
                model: models.User,
                as: 'author'
            }]
        },
            {
                model: models.Category,
                as: 'category'
            }]
    })
        .then(function (doctor) {
            res.json(doctor);
        });
}

function postDoctor(req, res, next) {

    models.Doctor.create({
        name: req.body.name,
        description: req.body.description,
        ordinationId: req.body.ordinationId,
        categoryId: req.body.categoryId
    })
        .then(function (doctor) {
            models.User.update({
                doctorId: doctor.id
            },{
                where: {
                    id: req.body.userId
                }
            })
                .then(function(result){
                    res.json(doctor);
                });
        });
}

function bookDoctor(req, res, next) {

    models.Reservation.create({
        hourId: req.body.hourId,
        userId: req.body.userId,
        doctorId: req.body.doctorId
    })
        .then(function (reservation) {
            res.json(reservation);
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


function getCategories(req, res, next){
    models.Category.findAll()
        .then(function (categories) {
            res.json(categories);
        })
}

function getDoctorsReservations(req, res, next) {
    models.Reservation.findAll({
        where: {
            doctorId: req.params.id
        }
    })
        .then(function (reservations) {
            res.json(reservations);
        })
}


function postDoctorReview(req, res, next) {
    models.Review.create({
        doctorId: req.params.id,
        authorId: req.body.authorId,
        title: req.body.title,
        comment: req.body.comment,
        stars: req.body.stars
    }, {
        include: [
            {
                model: models.User,
                as: 'author'
            }
        ]
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
    router.get(routes.categories, getCategories);
    router.post(routes.book, bookDoctor);
    router.get(routes.doctorReservations, getDoctorsReservations);
}