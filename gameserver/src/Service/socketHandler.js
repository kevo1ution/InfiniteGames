const mongo = require('mongodb');
let io;

//setup the socket
const listen = server => {
  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('connection');

    //auto connect socket to user id
    socket.on('userId', userId => {
      console.log(userId);
      socket.join(userId);
    });

    socket.on('disconnect', reason => {});
  });

  console.log('Socketio is setup!');
 
  return io;
};

//get the io
const getio = () => io;

//Socket connection (user)
module.exports = {
  listen,
  getio,
};
