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

var ourdiaRandom = function()
{
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return ourdiaRandom()+ourdiaRandom(); // to make it longer
};




/* GET users listing. */
router.get('/:email/validate/client', async function (req, res, next) {
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
        var myToken = token();
        mail(find.email);
        res.send(find);
        client.close();
    } catch (err) {
        //this will eventually be handled by your error handling middleware
        console.log(err.stack);
    }


});

async function mail(email){
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
        html: `<p><b> gros </b>  valide ton compte vite  <img src="https://cdn.vox-cdn.com/thumbor/JBJzwCXmTJs0NgnFtSPm_f5SMyw=/0x0:2000x1000/1200x800/filters:focal(654x138:974x458)/cdn.vox-cdn.com/uploads/chorus_image/image/59408999/Thanos_MCU.0.jpg"/></p>
        <p><br/><img src="/Users/oualikenourdia/Desktop/stootie.png"/></p>`,

        // AMP4EMAIL
        amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,



    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}






module.exports = router;
