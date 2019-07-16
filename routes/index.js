var express = require('express');
var router = express.Router();

const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;


const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

/* - Liste de tous les clients - */
router.get('/ALLfacture', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Factrure');
    var find = await col.find().toArray();
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});


/* Liste des annonces */
router.get('/getAnnonces', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Annonce');
    var find = await col.find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

/* - Récupération des informations sur un client - */
router.get('/:email/:mdp/connexionClient', async (req, res) => {
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
    const col = db.collection('Client');
    var find = await col.find({email: email, mdp: mdp}).toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});








module.exports = router;
