var express = require('express');
var router = express.Router();

const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var paypal = require('paypal-rest-sdk');




// set public directory to serve static html files


router.get('/', function(req, res, next) {
    res.redirect('/index.html');
});







