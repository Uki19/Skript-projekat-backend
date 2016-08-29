/**
 * Created by Uros Zivaljevic on 5/15/16.
 */

var doctors = require('./doctors');
var reviews = require('./reviews');
var users = require('./users');
var ordinations = require('./ordinations');
var articles = require('./articles');


module.exports.init = function(router) {
    doctors.init(router);
    reviews.init(router);
    users.init(router);
    ordinations.init(router);
    articles.init(router);
}