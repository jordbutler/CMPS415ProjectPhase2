const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jordbutler:AcidKvvng253@phase2.s5v65hg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = mongoose.connect(uri);
    
    app.get('/', function(req, res) {
      var outstring = 'Starting... ';
      res.send(outstring);
        
        mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
        
 });

app.get('/items', function(req, res) {
    const database = client.db('sample_airbnb');
    const cursor = database.collection('account').find();
  console.log(cursor)
});



// Add functions that make DB calls here

