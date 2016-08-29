/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
var models = require('../models');

var routes = {
    users: '/users',
    user: '/user/:id',
    usersRegister: '/users/register',
    usersLogin: '/users/login'
}

function registerUser(req, res, next) {
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
                        city: req.body.city
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
            if(!user){
                res.status(404).send("this user doesn't exist");
            } else {
                res.status(200).json(user);
            }
        })
}

module.exports.init = function (router) {
    router.post(routes.usersRegister, registerUser);
    router.post(routes.usersLogin, loginUser);
}