//dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const http = require('http');
const server = http.Server(app);

//config variables
const config = require('./config/config.js');

//Setup required services
//setting up the database
const dbsetup = require('./src/Dao/dbsetup');
const cleanup = require('./src/Service/cleanup')
dbsetup.connectDB(err => {
  if (err) throw err;

  //setup socket
  const WebSocketService = require('./src/Service/WebSocketService')
  WebSocketService.setup(app);

  const PlayerService = require('./src/Service/PlayersService')

  //Endpoint setup
  require('./src/Controller/frontendServe').setup(app);

  //start listening on port
  server.listen(global.gConfig.node_port, () => {
    console.log(
      `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
    );
  });

  //setup cleanup
  cleanup.Cleanup(()=>{
    console.log('cleaning up');

    //check if there are still writes that need to be executed;
    dbsetup.getClient().close();
  })

});

module.exports = app;
