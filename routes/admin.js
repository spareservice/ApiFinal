var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;


const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'


/* - Liste de tous les Admin - */
router.get('/admin', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('ADMin');
        var find = await col.find().toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

// cration d'un admin
router.post('/:nom/:prenom/:email/addAdmin', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var nom = req.params.nom;
        var prenom = req.params.prenom;
        var email = req.params.email;

        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('ADMin');
        await col.insertMany([{nom: nom, prenom: prenom, email: email}]);
        var check = await col.find({nom: nom, prenom: prenom, email: email}).toArray();
        res.send(check);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


/* - Suppression d'un admin - */
router.delete('/:email/supprimerAdmin', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.params.email;
        var mdp = req.params.mdp;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('ADMin');
        var findClient = await col.find({email: email, mdp: mdp});
        col.deleteOne({email: email, mdp: mdp});
        res.send("Admin suprimé");
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

module.exports = router;
