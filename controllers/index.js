/**
 * Created by Uros Zivaljevic on 5/15/16.
 */
var fields = require('./fields');
var players = require('./players');

module.exports.init = function(router) {
    fields.init(router);
    players.init(router);
}