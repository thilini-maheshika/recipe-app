const config = require('./config');
const mongoose = require('mongoose');

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(config.mongouri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const collectionList = [
    {
        name: "users"
    },
    {
        name: "favourite"
    }
];

let database = null;

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        database = client.db("recipeapp_db");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

async function checkAndCreateCollections() {
    try {
        const existingCollections = await database.listCollections().toArray();
        const existingCollectionNames = existingCollections.map(collection => collection.name);

        for (const collectionConfig of collectionList) {
            const collectionName = collectionConfig.name;

            if (!existingCollectionNames.includes(collectionName)) {
                await database.createCollection(collectionName);
                console.log(`Created collection '${collectionName}'`);
            }
        }

        for (const existingCollection of existingCollections) {
            const existingCollectionName = existingCollection.name;

            if (!collectionList.some(collectionConfig => collectionConfig.name === existingCollectionName)) {
                await database.collection(existingCollectionName).drop();
                console.log(`Deleted collection '${existingCollectionName}'`);
            }
        }
    } catch (error) {
        console.error("Error checking/creating collections:", error);
    }
}

function getDatabase() {
    return database;
}

module.exports = {
    connect,
    getDatabase,
    checkAndCreateCollections
};
