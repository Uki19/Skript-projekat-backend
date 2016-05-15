/**
 * Created by Uros Zivaljevic on 5/15/16.
 */
var express = require('express');
var controllers = require('./controllers/index');

var PORT = 3000;
// var HOST = "localhost";
var API_DIR = "/api";

var app = express();

//Routers
var router = express.Router();
app.use(API_DIR, router);

//Controllers
controllers.init(router);

//Start server
app.listen(PORT, function () {
    console.log("server is listening on port: " + PORT);
});