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

router.put('/addFacture/:idMission', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var idMission = req.params.idMission;
        await client.connect();
        const db = client.db(dbName);
        const colMission = db.collection('Mission');
        var findMission = await colMission.find({_id: ObjectId(idMission)}).toArray();
        var idClient = findMission[0]._idClient;
        var idPrestataire = findMission[0]._idPrestataire;
        const colFacture = db.collection('Factrure');
        await colFacture.insertMany([{_idMission: ObjectId(idMission), _idClient: ObjectId(idClient), _idPrestataire: ObjectId(idPrestataire)}]);
        var check = await colFacture.find({_idMission: ObjectId(idMission)}).toArray();
        res.send(check);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

module.exports = router;
