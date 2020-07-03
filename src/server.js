const path = require('path');
const express = require('express');
const http = require('http');
const logger = require('./logger')(module.filename);


const port = process.env.PORT || 1337;
const publicDir = path.join(__dirname, "..", "static");

const app = express();
const server = http.createServer(app);

app.use(express.static(publicDir))
app.set('view engine', 'hbs');

module.exports = {
  app,
  server,
  start(){
    server.listen(port, () => {
      logger.info(`Server up in port ${port}`);
    });
  }
}
