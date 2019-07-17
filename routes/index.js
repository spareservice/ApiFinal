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


/* - Recuperer Prestataire par id - */
router.get('/getPrestataireById/:id', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var id = req.params.id;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Prestataire');
    var find = await col.find({_id: ObjectId(id)}).toArray();
    //console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Client Filtrer par id- */
router.get('/getClient/:id', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var id = req.params.id;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    var find = await col.find({_id: ObjectId(id)}).toArray();
    //console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* Recuperer mission par id */
router.get('/getMissionClient', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    const idClient = req.body.id;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Mission');
    var find = await col.find({idClient: idClient}).toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* Recuperer mission par idMisssion */
router.get('/getMissionById/:id', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    const idMission = req.params.id;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Mission');
    var find = await col.find({_id: ObjectId(idMission)}).toArray();
    console.log(find);
    res.send(find);
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

/* - Check user deja existant - */
router.get('/:email/checkClient', async (req, res) => {
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
/* - Récupération des informations sur un prestataire - */
router.get('/connexionPrestataire', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.query.email;
    var mdp = req.query.mdp;
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


/* - POST METHOD - */

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
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    await col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel}]);
    var check = await col.find({nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel}).toArray();
    res.send(check);
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
/* - Création d'un prestataire - */
router.post('/ajoutPrestataire', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var nom = req.query.nom;
    var prenom = req.query.prenom;
    var email = req.query.email;
    var tel = req.query.tel;
    var mdp = req.query.mdp;
    var adresse = req.query.adresse;
    var ville = req.query.ville;
    var cp = req.query.cp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Prestataire');
    await col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel, adresse: adresse, cp: cp, ville: ville}]);
    var check = await col.find({nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel, adresse: adresse, cp: cp, ville: ville}).toArray();

    res.send(check);
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
    var debutDate = req.body.debutDate;
    var debutHeure = req.body.debutHeure;
    await client.connect();
    const db = client.db(dbName);
    const colClient = db.collection('Client');
    const colService = db.collection('Service');
    const colAnnonce = db.collection('Annonce');
    var checkClient = await colClient.find({email: email}).toArray();
    var checkService = await colService.find({nomService: subServiceName, typeService: serviceName}).toArray();
    var idClient = checkClient[0]._id;
    var idService = checkService[0]._id;
    await colAnnonce.insert({idClient: idClient, idService: idService, descriptionAnnonce: serviceDescription, detailAnnonce: serviceAdresse, debutDate: debutDate, debutHeure: debutHeure});

    var check = await colAnnonce.find().toArray();
    res.send(check);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Création d'un mission - */
router.post('/ajoutMission', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var idAnnonce = req.query.idAnnonce;
    var idClient = req.query.idClient;
    var idPrestataire = req.query.idPrestataire;
    var debutDate = req.query.debutDate;
    var debutHeure = req.query.debutHeure;
    var infoPrestataire = req.query.infoPrestataire;
    var isValide = req.query.isValide;
    var inProcess = req.query.inProcess;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Mission');
    await col.insert({_idAnnonce: idAnnonce, _idClient: idClient, _idPrestataire: idPrestataire, debutDate: debutDate, debutHeure: debutHeure, infoPrestataire: infoPrestataire, isValide: isValide, inProcess: inProcess, isFinish: "false", duree: "", finHeure: ""});

    var check = await col.find({idAnnonce: idAnnonce, idClient: idClient, idPrestataire: idPrestataire, debutDate: debutDate, debutHeure: debutHeure, isValide: isValide, inProcess: inProcess}).toArray();
    res.send(check);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});


/* - UPDATE METHOD - */

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
    const col = db.collection('Mission');
    await col.update({_id: ObjectId(idMission)}, {$set: isValide});
    var find = await col.find({_id: ObjectId(idMission)}).toArray();
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
})

/* - Mettre à jour la table Mission in Process - */
router.patch('/missionChangeInProcess/:idMission', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var idMission = req.params.idMission;
    var inProcess = req.query.inProcess;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Mission');
    await col.update({_id: ObjectId(idMission)}, {$set: {inProcess: inProcess}});
    var find = await col.find({_id: ObjectId(idMission)}).toArray();
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
})

/* - Mettre à jour la table Mission debutHeure - */
router.patch('/missionChangeDebutHeure/:idMission', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var idMission = req.params.idMission;
    var debutHeure = req.query.debutHeure;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Mission');
    await col.update({_id: ObjectId(idMission)}, {$set: {debutHeure: debutHeure}});
    var find = await col.find({_id: ObjectId(idMission)}).toArray();
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
})

router.patch('/missionSetFinHeure/:idMission', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var idMission = req.params.idMission;
    var finHeure = req.query.finHeure;
    var duree = req.query.duree
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Mission');
    var prixMinute = 10.03/60;
    var prixTotal = ((duree.split(":")[0])!="00")?((parseInt(duree.split(":")[0])*60)+(parseInt(duree.split(":")[1])))*prixMinute:((parseInt(duree.split(":")[1]))*prixMinute);
    await col.update({_id: ObjectId(idMission)}, {$set: {finHeure: finHeure, duree: duree, prixMinute: prixMinute, prixTotal: prixTotal, isFinish: "true"}});
    var find = await col.find({_id: ObjectId(idMission)}).toArray();
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
})

/* - DELETE METHOD - */

/* - Suppression d'un client - */
router.delete('/:email/:mdp/supprimerClient', async (req, res) => {
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

/* - Suppression d'une mission - */
router.delete('/deleteAnnonce/:idAnnonce', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var idAnnonce = req.params.idAnnonce;
    await client.connect();
    const db = client.db(dbName);
    const colAnnonce = db.collection('Annonce');
    const colMission = db.collection('Mission');
    var findAnnonce = await colAnnonce.find({_id: ObjectId(idAnnonce)}).toArray();
    var idClient = findAnnonce[0].idClient;
    console.log(findAnnonce);
    var findMission = await colMission.find({_idAnnonce: idAnnonce, inProcess: "true"}).toArray();
    console.log(findMission.length === 0);
    if(findMission.length === 0) {
      colMission.deleteOne({_idAnnonce: idAnnonce});
      colAnnonce.deleteOne({_id: ObjectId(idAnnonce)});
      var finalAnnonce = await colAnnonce.find({idClient: ObjectId(idClient)}).toArray();
      res.send(finalAnnonce)
    } else {
      res.send([{_id : "null"}]);
    }
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
//add on image to mango

router.put('/:nom/:prenom/updatePrestatire', async (req, res) => {
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








module.exports = router;
