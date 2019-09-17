'use strict';

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
  require('./src/Service/socketHandler').listen(server);

  //Endpoint setup
  require('./src/Controller/frontendServe').setup(app);

  //start listening on port 4005
  server.listen(global.gConfig.node_port, () => {
    console.log(
      `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
    );
  });

  //setup cleanup
  cleanup.Cleanup(()=>{
    console.log('cleaning up');

    //check if there are still writes that need to be executed;
    dbsetup.getDB().close();
  })

});

module.exports = app;
