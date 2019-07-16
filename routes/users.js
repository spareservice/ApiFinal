var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");

/* GET users listing. */
router.get('/', function(req, res, next) {
// res.send('/index');
 res.redirect('index.html');
});


// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AXTSmSp5I1Jy-P2_u0gLvCcI6bxlsjWS9UjwrC7kwyecQoL1NqyQGskgncIu79s0C9hyoRLUwy7snWtp',
  'client_secret': 'EEvxBAo8NHzjl3nCMBBwkH7BjX6UcX9TWj4ZV3V48sb3VqrNbpR1tv0riRUxLqgPrHWIulY21l--RtJs'
});



router.get('/buy' , ( req , res ) => {
  var payment = {
    "intent": "authorize",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://127.0.0.1:3000/paiment/success",
      "cancel_url": "http://127.0.0.1:3000/err"
    },
    "transactions": [{
      "amount": {
        "total": 39.00,
        "currency": "USD"
      },
      "description": " a book on mean stack "
    }]
  }

  createPay( payment )
      .then( ( transaction ) => {
        var links = transaction.links;
        var counter = links.length;
        while( counter-- ) {
          if ( links[counter].method == 'REDIRECT') {
            return res.redirect( links[counter].href )
          }
        }
      })
      .catch( ( err ) => {
        console.log( err );
        res.redirect('/err');
      });
});



router.get('/success' , (req ,res ) => {
  console.log(req.query);
  res.redirect('../success.html');
})

router.get('/err' , (req , res) => {
  console.log(req.query);
  res.redirect('err.html');
})




var createPay = ( payment ) => {
  return new Promise( ( resolve , reject ) => {
    paypal.payment.create( payment , function( err , payment ) {
      if ( err ) {
        reject(err);
      }
      else {
        resolve(payment);
      }
    });
  });
}
module.exports = router;
