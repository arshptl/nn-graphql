const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
// const mongoose = require("mongoose")
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();

// allow cross-origin requests
app.use(cors());

// Connect with the database
mongoose.connect(
  "mongodb+srv://harshptl14:h4rshptl14@cluster0.sghsssx.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log('connected with the database');
})

//graphqlHTTP is a middleware that has been passed into express app
app.use(
  "/graphql",
  graphqlHTTP({
    // passing this schema through this middleware
    // giving express graphql to use this schema
    schema: schema,
    graphiql: true
  })
);

// app is listening on this port
// When app begin to listen to this port, this callback funciton will going to fire, 
// and tell us in the console that it's listening for reqs
app.listen(4000, () => {
  console.log("Now listening for reqs on port 4000");
});
