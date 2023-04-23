const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jordbutler:AcidKvvng253@phase2.s5v65hg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const mongoose = require("mongoose");

    
    app.get('/', function(req, res) {
        
        
        mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
        
 });



main().catch(console.error);

// Add functions that make DB calls here
