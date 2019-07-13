var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
const ObjectId = require('mongodb').ObjectId
const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

const billUtils = require('../utils').bill;



async function IdClient() {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Factrure');
        var data2 = await col.distinct("_idClient");
        client.close();

    return data2;
}



async function IdPrestatire() {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Factrure');
    var data2 = await col.distinct("_idPrestatire");
    client.close();

    return data2;
}


async function prestatire() {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);        const col = db.collection('Prestataire');
        var data2= await col.distinct("_id");
        var cc = await IdPrestatire();
        var users = [];
        for (var i=0; i<data2.length;i++ ) {
            var find = await col.find({
                _id:ObjectId(cc[i])
            }).toArray();
            if (find.length!== 0){
                users.push(find[0]);
            }
        }
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
    return {users};
}

async function monClient() {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);        const col = db.collection('Client');
        var data2= await col.distinct("_id");
        var cc = await IdClient();
        var users = [];
        for (var i=0; i<data2.length;i++ ) {
            var find = await col.find({
                _id:ObjectId(cc[i])
            }).toArray();
            if (find.length!== 0){
                users.push(find[0]);
            }
        }
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
    return {users};
}

/* GET home page. */
router.get('/:id_bill', async function (req, res, next) {
    /*
    var client = await monClient();
    var presta = await prestatire();
   var json = JSON.parse(presta);



    res.send(json);

     */
    res.json(await billUtils.getById(req.params.id_bill));
});

module.exports = router;
