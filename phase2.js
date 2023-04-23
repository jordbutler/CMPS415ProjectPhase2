const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
const uri = "mongodb+srv://w0708515:KvvngAcid253@jbdb.wr4nvvi.mongodb.net/?retryWrites=true&w=majority";

// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Default route:
app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});

/* POST Method */
app.post('/user/add', (req, res) => {
    //get the existing user data
    const client = new MongoClient(uri);
    const database = client.db('jbdb');
    const existUsers = database.collection('cmps415mongodb').find();
    
    //get the new user data from post request
    const userData = req.body

    //User needs a fullname, age, username, and password
    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    
    //check if the username exist already
    const findExist = existUsers.find( user => user.username === userData.username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    res.send({success: true, msg: 'User data added successfully'})
    existUsers.insertOne(req.body).then(result => {
      console.log(result)
    }).catch(error => console.error(error))
    

});


// Route to access database:
app.get('/api/mongo/:item', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{ partID: '" + req.params.item + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    const database = client.db('jbdb');
    const parts = database.collection('cmps415mongodb');

    // Hardwired Query for a part that has partID '12345'
    // const query = { partID: '12345' };
    // But we will use the parameter provided with the route
    const query = { partID: req.params.item };

    const part = await parts.findOne(query);
    console.log(part);
    res.send('Found this: ' + JSON.stringify(part));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});

app.get('/api/items', (req, res) => {
  const client = new MongoClient(uri);
  const database = client.db('jbdb');
  const cursor = db.collection('cmps415mongodb').find()
  console.log(cursor)
  // ...
})
