require('../src/logger');
const {connect, db} = require('../src/db');
const {nobles, cards} = standardGame = require('../data/standardGame');
const logger = require('../src/logger')(module.filename);
const {EventEmitter} = require('events');


const emitter = new EventEmitter();
let operationCounter = 0;

emitter.on("error", (err) => {
  logger.error(err);
  process.exit(777);
})

emitter.on("completeOperation", () => {
  operationCounter++;
  if (operationCounter>=Object.keys(standardGame).length){
    logger.info("Success!")
    db.close();
  }
})

function handle(cb){
  return function callback(err, result){
    if (err) {
      emitter.emit("error", err)
      return;
    }
    cb(result);
  }
}


function repopulate(Model, catalog){
  Model.deleteMany({}, handle(() => {
    logger.info(`Emptied ${Model.modelName} catalog successfully`);
    Model.insertMany(catalog, handle(() => {
      logger.info(`Recreated ${Model.modelName} catalog successfully`);
      emitter.emit("completeOperation")
    }))
  }));
}

module.exports = (() => {
  connect((err, {Card, Noble}) => {
      repopulate(Card, cards);
      repopulate(Noble, nobles);
      // db.close();
  });
})();
