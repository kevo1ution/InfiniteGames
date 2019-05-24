var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
    client.emit('messages', {hello: 'world'})
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, ()=>{
    console.log('listening on port 8080');
});