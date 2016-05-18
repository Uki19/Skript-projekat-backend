/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
/**
 * Created by Uros Zivaljevic on 5/18/16.
 */
var models = require('../models');

var routes = {
    users: '/reviews',
    user: '/reviews/:id'
}

function postUser(req, res, next) {
    models.find({
            where: {
                email: req.body.email
            }
        })
        .then(function (user) {
            if (user) {
                res.error("exists");
                return;
            } else {
                models.User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password,
                        city: req.body.city
                    })
                    .then(function (user) {
                        res.json(user);
                    });
            }
        })
}

module.exports.init = function (router) {
    router.post(routes.users, postUser);
}