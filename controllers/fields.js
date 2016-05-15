/**
 * Created by Uros Zivaljevic on 5/15/16.
 */

var models = require('../models');

var routes = {
    fields: "/fields",
    field: "/fields/:id"
}

function getFields(req, res, next){
    models.field.findAll({}).then(function(fields){
        res.json(fields);
    });
}

module.exports.init = function(router) {
    router.get(routes.fields, getFields);
}
