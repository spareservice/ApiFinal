var express = require('express');
var router = express.Router();

const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;


const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

// récuperr les mission
router.get('/', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Mission');
        var find = await col.find().toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});
// update Mission
router.put('/Prestataire/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Mission');
        try {
            await col.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: req.body
            }, {
                upsert: true
            });
            res.send("Update done")
        } catch(err) {
            res.send("Update failed")
        }

        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


/* Recuperer Annonce par id */
router.get('/getAnnonceById/:id', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var idAnnonce = req.params.id;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Annonce');
        var find = await col.find({_id: ObjectId(idAnnonce)}).toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

/* - Mettre à jour la table Mission - */
router.patch('/missionChangeIsValide/:idMission', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var idMission = req.params.idMission;
        var isValide = req.body;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Mission');col.update({_id: ObjectId(idMission)}, {$set: isValide});
        var find = await col.find({_id: ObjectId(idMission)}).toArray();
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
})

module.exports = router;
