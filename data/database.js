const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb://localhost:27017/online-shop', { useNewUrlParser: true, useUnifiedTopology: true });
    database = client.db(); // No need to specify the database name here
}


function getDb(){
    if (!database) {
        throw new Error('You must connect first');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}

