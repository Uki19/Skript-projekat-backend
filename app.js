/**
 * Created by Uros Zivaljevic on 5/15/16.
 */
var express = require('express');

//init controllers
var controllers = require('./controllers/index');

var app = express();
var PORT = 3000;
var HOST = "localhost";

var router = express.Router();
app.use('/api/v1/', router);
controllers.init(router);

app.listen(PORT, function (err) {
    if(err) throw  err;
    console.log("server is listening on port: " + PORT);
});