//dependencies
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

//environment varialbes
process.env.NODE_ENV = "development";

//config variables
const config = require("./config/config.js");

//module variables
const app = express();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

//start up the server and display configuraitons
app.listen(global.gConfig.node_port, () => {
  console.log(
    `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
  );
});
