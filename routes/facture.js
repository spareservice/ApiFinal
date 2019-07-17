var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
const ObjectId = require('mongodb').ObjectId
const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'
var pdf = require('html-pdf');
/* GET home page. */


const billUtils = require('../utils').bill;

router.get('/:id_bill', async function (req, res, next) {

    const obj = await billUtils.getById(req.params.id_bill);
    res.type('application/pdf');
    res.render('../public/jsontopdf.hjs', obj, (err, html) => {
        if(err) {
            res.end();
            return;
        }
        pdf.create(html).toBuffer((err, buff) => {
            if(err) {
                res.end();
                return;
            }
            res.end(buff,'binary');
        });
    })


});

module.exports = router;
