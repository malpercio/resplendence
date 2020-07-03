const mongoose = require('mongoose');
const logger = require('./logger')(module.filename);
const {getOrFail} = require('./helpers');
const modelSchemas = require('../src/modelSchemas');


const DB_USER = process.env.DB_USER || "resplendence";
const DB_PASS = getOrFail("DB_PASS");
const DB_COLLECTION = process.env.DB_COLLECTION || "resplendence";
const DB_URL = process.env.DB_URL ||"maincluster-qimfs.mongodb.net";

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_COLLECTION}`;

mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});

const db = mongoose.connection;
const models = {};

db.on('error', (err) => logger.error(err));

module.exports = {
  connect(cb){
    db.once('open', () => {
      logger.info("DB connected")

      for(let modelName in modelSchemas){
        models[modelName] = mongoose.model(modelName, modelSchemas[modelName]);
      }
      cb(undefined, models);
    });
  },
  db,
  models
};
