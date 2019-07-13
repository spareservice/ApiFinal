const mongo = require('./mongo');

module.exports = {

    collection: 'Mission',
getById: async function(id) {

     const mongoClient = await mongo.getClient();
        const db = mongoClient.db(mongo.database);
        const col = db.collection(this.collection);
        const res = await col.findOne({
            _id: id
        });
        await mongoClient.close();
        return res;
    }
};