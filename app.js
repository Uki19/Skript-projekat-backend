/**
 * Created by Uros Zivaljevic on 5/15/16.
 */
var express = require('express');
var controllers = require('./controllers/index');
var models = require("./models");
var bodyParser = require("body-parser");

var PORT = 3000;
// var HOST = "localhost";
var API_DIR = "/api";

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routers
var router = express.Router();
app.use(API_DIR, router);

//Controllers
controllers.init(router);

//Start server
models.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("server is listening on port: " + PORT);
    });
});

