/**
 * Created by Uros Zivaljevic on 5/15/16.
 */

var routes = {
    fields: "/fields",
    field: "/fields/:id"
}

function getFields(req, res, next){
    res.send("welcome to fields page");
}

module.exports.init = function(router) {
    router.get(routes.fields, getFields);
}