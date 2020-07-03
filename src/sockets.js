const socketio = require('socket.io');
const logger = require('./logger')(module.filename);


function createSocketInterface(server){
  const io = socketio(server);
    io.on("connection", (socket) => {
      logger.info('New connection');
      socket.on("join", ({username, room}) => {
        io.clients((error, clients) => {
          if(clients.length) {

          } else {
            socket.join(room);
          }
        });
      });

    });

}


module.exports = createSocketInterface;
