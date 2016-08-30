/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
/**
 * Created by Uros Zivaljevic on 5/18/16.
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
    users: '/users',
    user: '/users/:id',
    usersRegister: '/users/register',
    usersLogin: '/users/login'
};

function registerUser(req, res, next) {
    var imgPath = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
    if (req.file) {
        imgPath = "http://localhost:3000/images/" + req.file.filename;
    }
    console.log(imgPath);
    models.User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(function (user) {
            if (user) {
                res.status(500).send("exists");
            } else {
                models.User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    city: req.body.city,
                    imageUrl: imgPath
                })
                    .then(function (user) {
                        res.status(201).json(user);
                    });
            }
        })
}

// login user
function loginUser(req, res, next) {
    models.User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(function (user) {
            if (!user) {
                res.status(404).send("this user doesn't exist");
            } else {
                res.status(200).json(user);
            }
        })
}

function getUser(req, res, next) {
    models.User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.Doctor,
                as: 'doctor',
                include: [
                    {
                        model: models.Category,
                        as: 'category'
                    },
                    {
                        model: models.Article,
                        as: 'articles'
                    }]
            },
            {
                model: models.Reservation,
                as: 'reservations',
                include: [
                    {
                        model: models.Doctor,
                        as: 'doctor'
                    }
                ]

            },
            {
                model: models.Review,
                as: 'reviews',
                include: [
                    {
                        model: models.Doctor,
                        as: 'doctor'
                    }
                ]

            }
        ]
    })
        .then(function (user) {
            if (!user) {
                res.status(404).send("this user doesn't exist");
            } else {
                res.status(200).json(user);
            }
        })
}

module.exports.init = function (router) {
    router.post(routes.usersRegister, upload.single('file'), registerUser);
    router.post(routes.usersLogin, loginUser);
    router.get(routes.user, getUser);
};