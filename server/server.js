//dependencies
const express = require("express");

//environment varialbes
process.env.NODE_ENV = "development";

//config variables
const config = require("./config/config.js");

//module variables
const app = express();

app.get("/", (req, res) => {
  res.json(global.gConfig);
});

app.listen(global.gConfig.node_port, () => {
  console.log(
    `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
  );
});
