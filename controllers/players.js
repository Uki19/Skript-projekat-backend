/**
 * Created by Uros Zivaljevic on 5/15/16.
 */
var routes = {
    fields: "/players",
    field: "/players/:id"
}

function getPlayers(req, res, next){
    res.send("welcome to players page");
}

module.exports.init = function(router) {
    router.get(routes.players, getPlayers);
}