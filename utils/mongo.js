const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';

module.exports = {

    database: 'spareAPI',

    getClient: function() {
        const client = new MongoClient(url, {urlNewParser : true});
        return client.connect();
    }
}