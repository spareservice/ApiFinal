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

router.get('/lol', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/:email/validate', async function (req, res, next) {
    var json;
    try {
        // Connection URL
        const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
        // Database Name
        const dbName = 'spareAPI';
        const client = new MongoClient(url);
        useNewUrlParser: true
        var email = req.params.email;
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('Client');
        var find = await col.findOne({email: email});

        console.log(find._id);
        console.log(find.token);
        mail(find.email,find.token,find._id);
    
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }


});

async function mail(email,token,id){
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
        subject: "validation de la boite mail ",
        text: "Hello world?",
        html: `<h1>  veuiller valider votre compte  </h1>
        <p><br/><img src="/Users/oualikenourdia/Desktop/stootie.png"/></p> <br>
        <h2> Pour valider votre compte veuilly clicker sur le lien en dessous </h2>
        <br>
       <button> <a href="http://localhost:3000/client/${email}/${id}/${token}/checkClient"> clicker</a> </button>`,


    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

var ourdiaRandom = function()
{
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return ourdiaRandom(); // to make it longer
};




module.exports = router;
