//Set up configurations

//dependencies
const _ = require("lodash");

// module variables
const config = require("./config.json");
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

//cors configuration
finalConfig.corsOptions = {
  origin: function(origin, callback) {
    if (finalConfig.cors.whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;
console.log(
  `global.gConfig: ${JSON.stringify(
    global.gConfig,
    undefined,
    global.gConfig.json_indentation
  )}`
);
