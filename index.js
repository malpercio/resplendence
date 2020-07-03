const logger = require('./src/logger')(module.filename);
const {connect} = require('./src/db');
const {app, server, start} = require('./src/server');
const listen = require('./src/sockets');

connect(() => {
  listen(server);
  start();
})
