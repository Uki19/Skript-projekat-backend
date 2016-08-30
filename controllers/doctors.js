/**
 * Created by Uros Zivaljevic on 5/17/16.
 */

var models = require('../models');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage});

var routes = {
    doctors: '/doctors',
    doctorsLatest: '/latestDoctors',
    doctor: '/doctors/:id',
    doctorReviews: '/doctors/:id/reviews',
    categories: '/categories',
    book: '/book',
    doctorReservations: '/doctors/:id/reservations',
    doctorsByCategory: '/doctors/categories/:categoryId'
};

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
            res.status(200).json(doctors);
        });
}

function getLatestDoctors(req, res, next) {
    models.Doctor.findAll({
        include: [{
            model: models.Category,
            as: 'category'
        }],
        limit: 4,
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function (doctors) {
            res.status(200).json(doctors);
        });
}

function getDoctorsByCategory(req, res, next) {
    models.Doctor.findAll({
        where: {
            categoryId: req.params.categoryId
        },
        include: [
            {
                model: models.Category,
                as: 'category'
            },
            {
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
            res.status(200).json(doctors);
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
            res.status(200).json(doctor);
        });
}

function postDoctor(req, res, next) {

    var imgPath = "https://www.renown.org/wp-content/themes/renown/assets/images/find-a-doc-default.png";
    if (req.file) {
        imgPath = "http://localhost:3000/images/" + req.file.filename;
    }
    models.Doctor.create({
        name: req.body.name,
        description: req.body.description,
        ordinationId: req.body.ordinationId,
        categoryId: req.body.categoryId,
        imageUrl: imgPath
    })
        .then(function (doctor) {
            models.User.update({
                doctorId: doctor.id
            }, {
                where: {
                    id: req.body.userId
                }
            })
                .then(function (result) {
                    res.status(201).json(doctor);
                });
        });
}

function bookDoctor(req, res, next) {

    models.Reservation.create({
        date: req.body.date,
        userId: req.body.userId,
        doctorId: req.body.doctorId
    })
        .then(function (reservation) {
            res.status(201).json(reservation);
        });

}

function getDoctorReviews(req, res, next) {
    models.Review.findAll({
        where: {
            doctorId: req.params.id
        }
    })
        .then(function (reviews) {
            res.status(200).json(reviews);
        });
}


function getCategories(req, res, next) {
    models.Category.findAll()
        .then(function (categories) {
            res.status(200).json(categories);
        })
}

function getDoctorsReservations(req, res, next) {
    models.Reservation.findAll({
        where: {
            doctorId: req.params.id
        }
    })
        .then(function (reservations) {
            res.status(200).json(reservations);
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
            res.status(201).json(review);
        });
}

module.exports.init = function (router) {
    router.get(routes.doctors, getDoctors);
    router.post(routes.doctors, upload.single('file'), postDoctor);
    router.get(routes.doctor, getDoctor);
    router.get(routes.doctorReviews, getDoctorReviews);
    router.post(routes.doctorReviews, postDoctorReview);
    router.get(routes.categories, getCategories);
    router.post(routes.book, bookDoctor);
    router.get(routes.doctorReservations, getDoctorsReservations);
    router.get(routes.doctorsByCategory, getDoctorsByCategory);
    router.get(routes.doctorsLatest, getLatestDoctors);
}