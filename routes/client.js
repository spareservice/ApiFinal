var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;

var mail = require("./mailRequest");
var mail = require("./facture");



const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

  function ourdiaRandom()
{
    return Math.random().toString(36).substr(2); // remove `0.`
};

  function token() {
    return ourdiaRandom() +ourdiaRandom(); // to make it longer
};



/* - Liste de tous les clients - */
router.get('/', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.find().toArray();
        var data2= await col.distinct("_id");
        //var cc = IdClient();
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});

/* - Création d'un client - */
router.post('/:nom/:prenom/:email/:mdp/:tel/ajoutClient', async (req, res) => {
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
        var monToken=  token();
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        await col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel , token:monToken ,confirmedToken:false} ]);
        var check = await col.find({nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel ,token:monToken ,confirmedToken:false}).toArray();
        res.send(check);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});


router.get('/:email/confirmed', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.params.email;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.find({email: email}).toArray();
        console.log(find);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }
});



// update Clien
router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
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

/* - Suppression d'un client - */
router.delete('/:email/supprimerClient', async (req, res) => {
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.params.email;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var findClient = await col.find({email: email});
        col.deleteOne({email: email});
        res.send("Client Supprimé");
        client.close();
    } catch (err) {

        console.log(err.stack);
    }
});

// comfirmation d'un mail
router.get('/:email/:id/:token/checkClient', async (req, res) => {

    const id = req.params.id;
    try {
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.params.email;
        var token = req.params.token;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.findOne({email: email});
        console.log("hell"+find.token);
        var value =  (find.confirmedToken);
        console.log(find.token);
        if(value == false && token==find.token){
            await col.updateOne({
                _id: new ObjectId(id)
            }, {

                $set: { "confirmedToken" : true }
            }, {
                upsert: true
            });
            res.send("votre compte est validé ");
        }else if (value==true && token==find.token){
            res.send(" votre compte est deja confirmer ");
        }else {
            res.send(" ce lien n'est pas valide ");
        }

        client.close();
    } catch (err) {
        console.log(err.stack);
    }
});
// afficher les compte validé

router.get('/:email/status', async (req, res) => {
    try {
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var email = req.params.email;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.findOne({email: email});
        console.log("hell"+find.token);
        var value =  (find.confirmedToken);
        res.send(value);

        client.close();
    } catch (err) {
        console.log(err.stack);
    }
});

router.get('/getClientById/:idClient', async (req, res) => {
    try {
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var idClient = req.params.idClient;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.find({_id: ObjectId(idClient)}).toArray();
        res.send(find);

        client.close();
    } catch (err) {
        console.log(err.stack);
    }
})

module.exports = router;
