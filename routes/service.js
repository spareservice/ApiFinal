var express = require('express');
var router = express.Router();

const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;


const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'


// update Service
router.put('/Service/:id', async (req, res) => {

    const id = req.params.id;
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Service');
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
router.get('/', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var type = req.query.type;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Service');
        //var find = await col.find().toArray();
        var find = await col.find({typeService: type}).toArray();
        //console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});



/* - Liste des services principaux - */
router.get('/servicesPrincipaux', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Service');
        var find = await col.distinct('typeService');//find().toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});



/* - Service Filtrer par id- */
router.get('/getService/:id', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var id = req.params.id;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Service');
        var find = await col.find({_id: ObjectId(id)}).toArray();
        //console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


/* - Création d'un service - */
router.post('/:nom/:type/ajoutService', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var nom = req.params.nom;
        var type = req.params.type;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Service');
        await col.insert({nomService: nom, typeService: type});
        var check = await col.find({nomService: nom, typeService: type}).toArray();
        res.send(check);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

/* - Création d'un service - */
router.post('/ajoutAnnonce', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.body.email;
        var serviceName = req.body.serviceName;
        var subServiceName = req.body.subServiceName;
        var serviceDescription = req.body.serviceDescription;
        var serviceAdresse = req.body.serviceAdresse;
        await client.connect();
        const db = client.db(dbName);
        const colClient = db.collection('Client');
        const colService = db.collection('Service');
        const colAnnonce = db.collection('Annonce');
        var checkClient = await colClient.find({email: email}).toArray();
        var checkService = await colService.find({nomService: subServiceName, typeService: serviceName}).toArray();
        var idClient = checkClient[0]._id;
        var idService = checkService[0]._id;
        await colAnnonce.insert({idClient: idClient, idService: idService, descriptionAnnonce: serviceDescription, detailAnnonce: serviceAdresse});

        var check = await colAnnonce.find().toArray();
        res.send(check);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


// supression d'un service

router.delete('/:nomService/deleteService', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var nomService = req.params.nomService;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var findClient = await col.find({nomService: nomService});
        col.deleteOne({nomService: nomService});
        res.send("Service  Supprimé");
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});
module.exports = router;
