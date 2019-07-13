const mongo = require('./mongo');
const client = require('./client');
const serviceProvider = require('./service-provider');
const mission = require('./mission');
const ObjectId = require('mongodb').ObjectId;

module.exports = {

    collection: 'Factrure',

    getById: async function(id) {
        const mongoClient = await mongo.getClient();
        const db = mongoClient.db(mongo.database);
        const col = db.collection(this.collection);
        console.log(col);
        const res = await col.findOne({
            _id: new ObjectId(id)
        });
        await mongoClient.close();
        if(res === null) {
            return;
        }

        res.client = await client.getById(res._idClient);
        res.prestataire = await serviceProvider.getById(res._idPrestatire);
        res.mission = await mission.getById(res._idMission);

        return res;
    }
};