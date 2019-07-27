const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
    console.log('Client Connected');
    client.emit('messages', {hello: 'world'});
});

app.get('/api/customers', (req, res) =>{
    const customers = [
        { id: 1, firstName: 'John', lastName: 'Doe'},
        { id: 2, firstName: 'Name1', lastName: 'L1'},
        { id: 3, firstName: 'N2', lastName: 'L2'},
    ];

    res.json(customers);
});

const port = 5000;
server.listen(port, ()=> console.log(`Server started on port ${port}`));