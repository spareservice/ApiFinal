var express = require('express');
var router = express.Router();

const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;


const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

/* - Liste de tous les prestataires - */
router.get('/prestataire', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Prestataire');
        var find = await col.find().toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

/* - Création d'un prestataire - */
router.post('/:nom/:prenom/:email/:mdp/:tel/:salaire/ajoutPrestataire', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var nom = req.params.nom;
        var prenom = req.params.prenom;
        var email = req.params.email;
        var tel = req.params.tel;
        var mdp = req.params.mdp;
        var salaire = req.params.salaire;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Prestataire');
        await col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel, salaire: salaire}]);
        var check = await col.find({nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel, salaire: salaire}).toArray();
        res.send(check);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


// update Prestataire
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
        const col = db.collection('Prestataire');
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
/* - Récupération des informations sur un prestataire - */
router.get('/:email/:mdp/connexionPrestataire', async (req, res) => {
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
        const col = db.collection('Prestataire');
        var find = await col.find({email: email, mdp: mdp}).toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

/* - Suppression d'un prestataire - */
router.delete('/:email/supprimerPrestataire', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.params.email;

        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Prestataire');
        var findClient = await col.find({email: email});
        col.deleteOne({email: email});
        res.send("Prestataire Supprimé");
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


module.exports = router;