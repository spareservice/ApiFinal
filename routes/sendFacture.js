var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ObjectId = mongo.ObjectId;
const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'
/*
async function SendFacture(email, id){
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'testesgipa@gmail.com',
            pass: '13Lamoto'
        }
    });
    let info = await transporter.sendMail({
        from: '"Spare service " <testesgipa@gmail.com>', // sender address
        to: email,
        subject: " facture spare Service ",
        text: "Hello world?",
        html: `<h1>  veuiller valider votre compte  </h1>
      
        <h2>  merci d'etre passé chez spare service veuilly trouver ici  </h2>
            <h2>  votre facture   </h2>
        <br>
       <button> <a href="http://localhost:3000/facture/${id}"> pour telécharger votre facture clicker ici</a> </button>`,


    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}
*/

async function mail(email,id){
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'testesgipa@gmail.com',
            pass: '13Lamoto'
        }
    });
    let info = await transporter.sendMail({
        from: '"Spare service " <testesgipa@gmail.com>', // sender address
        to: email,
        subject: " facturation  ",
        text: " votre facture est disponible ",
        html: `<h1 style ="color: #33ff55"; >  Spare Service   </h1>
        <h2> Mérci d'avoir utiliseer Spare Service  </h2>
        <br>
       <h3>  clicker ici pour télécherger votre facture  </h3>
       <button> <a href="http://localhost:3000/facture/${id}"> télécharger </a> </button>\`,

      

`,


    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}


router.get('/:id/:idClient', async (req, res) => {
    try {
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        var idClient = req.params.idClient;
        var idFacture = req.params.id;

        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.find({_id: ObjectId(idClient)}).toArray();
        var idcliente= find[0]._id;
        var email= find[0].email;

        console.log(email);
        console.log(idFacture);

        mail(email,idFacture);
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
});
module.exports = router;


