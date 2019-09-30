const mongodb = require('mongodb');

const { MongoClient } = mongodb;
let _db; let
  _client;

// conifgure constants
const MONGODB_DATABASE_URL = // format: mongodb://DBHOST:DBPORT/DBNAME
  `mongodb://${
    global.gConfig.database.host
  }:${
    global.gConfig.database.port
  }/${
    global.gConfig.database.dbName}`;

const connectDB = async (callback) => {
  try {
    const options = {
      useNewUrlParser: true,
    };
    if (process.env.NODE_ENV != 'development') {
      options.auth = {
        user: global.gConfig.database.name,
        password: global.gConfig.database.password,
      };
    }

    MongoClient.connect(MONGODB_DATABASE_URL, options, async (err, client) => {
      if (err) {
        callback(err);
      } else if (!client) {
        callback(new Error("DB doesn't exist!"));
      } else {
        // drop database if testing
        if (process.env.NODE_ENV == 'development') {
          await client.db(global.gConfig.database.dbName).dropDatabase();
          console.log('Loading in Mock Data!');
        }

        // create database if not made
        _db = client.db(global.gConfig.database.dbName);
        _client = client;

        // create collections if not made

        callback();
      }
    });
  } catch (e) {
    callback(e);
  }
};

const getClient = () => _client;
const getDB = () => _db;
const disconnectDB = () => _db.close();
module.exports = {
  connectDB, getDB, disconnectDB, getClient,
};
