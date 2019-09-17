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

    //user is switching rooms to subscribe to a new issue
    socket.on('subscribe', room => {
      socket.join(room);
    });

    socket.on('unsubscribe', room => {
      socket.leave(room);
    });

    socket.on('disconnect', reason => {});

    socket.emit('/handshake');
  });

  console.log('Socketio is setup!');

  return io;
};

//get the io
const getio = () => io;

//important io messages
const onNewIssue = newIssue => {
  io.emit('/issue', newIssue);
};

const onUpdateIssue = newIssue => {
  io.emit('/updateIssue', newIssue);
};

//update io issue
const onNewCommand = newCommand => {
  io.to(newCommand.issueId).emit('/command', newCommand);
};

//update command
const onUpdateCommand = newCommand => {
  io.to(newCommand.issueId).emit('/updateCommand', newCommand);
};

//important io messages
const onUpdateBindex = bindex => {
  io.emit('/updateBindex', bindex);
};

const onUpdateBridgeCommand = bcommand => {
  io.to(bcommand.bindexId).emit('/updateBridgeCommand', bcommand);
};

const onUpdateLog = log => {
  io.to(log.bindexId).emit('/updateLog', log);
};

//Socket connection (user)
module.exports = {
  listen,
  getio,
  onNewIssue,
  onUpdateIssue,
  onNewCommand,
  onUpdateCommand,
  onUpdateBindex,
  onUpdateBridgeCommand,
  onUpdateLog
};
