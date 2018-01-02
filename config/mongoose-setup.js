const mongoose = require("mongoose");


// Use native JavaScript promises in Mongoose commands
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/portfolio", { useMongoClient: true })
  .then(() => {
    console.log("Mongoose is connected!");
  })
  .catch((err) =>  {
    console.log("Mongoose connection FAILED! ");
    console.log(err);
  });
