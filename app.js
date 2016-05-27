/**
 * Created by Uros Zivaljevic on 5/15/16.
 */
var express = require('express');
var controllers = require('./controllers/index');
var models = require("./models");
var bodyParser = require("body-parser");

// var HOST = "localhost";
var API_DIR = "/api";
var FORCE_DB_SYNC = false;

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routers
var router = express.Router();
app.use(API_DIR, router);

//Controllers
controllers.init(router);

//Start server
models.sequelize.sync({force:FORCE_DB_SYNC}).then(function () {
    app.listen(app.get('port'), function () {
        console.log("server is listening on port: " + app.get('port'));
    });
});

