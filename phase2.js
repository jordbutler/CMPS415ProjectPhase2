const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://w0708515:KvvngAcid253@jbdb.wr4nvvi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    

 MongoClient.connect(uri)
  .then(client => {
    
    console.log('Connected to Database')
    const db = client.db('jbdb')
    const __dirname = 'CMPS415ProjectPhase2'

    app.post('/rest/ticket/delete', (req, res) => {

      const ticket = req.body.ticketID;

    
    db.collection('cmps415mongodb').deleteOne({ "ticketID" : ticket }).then(results => {
      console.log(results)
      res.redirect('/')
    })
    .catch(error => console.error(error))
    
      
    });

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
      
    });
    
    app.get('/rest/ticket/list', function(req, res) {
        db.collection('cmps415mongodb').find().toArray()
        .then(results => {
          console.log(results)
        }).catch(error => console.error(error));
    const tickets = db.collection('cmps415mongodb').find();
    res.send('Found this: ' + JSON.stringify(tickets));
    });



    app.get('/rest/ticket/:id', function(req, res) {
      const searchKey = "{ ticketID: '" + req.params.id + "' }";
      console.log("Looking for: " + searchKey);
      
      async function run() {
        try {
          
          const tickets = db.collection('cmps415mongodb');
    
          const query = { ticketID: req.params.id };
      
          const ticket = await tickets.findOne(query);
          console.log(ticket);
          res.send('Found this: ' + JSON.stringify(ticket));  
      
        } finally {
          
          await client.close();
        }
      }
      run().catch(console.dir);
      });

      app.post('/rest/ticket/post', (req, res) => {
        const dt = new Date();
        db.collection('cmps415mongodb')
          .insertOne({
            ticketID : req.body.ticketID,
            created_at : dt,
            updated_at : dt,
            type : req.body.type,
            subject : req.body.subject,
            description : req.body.description,
            priority : req.body.priority,
            status : req.body.status,
            recipient : req.body.recipient,
            submitter : req.body.submitter,
            asignnee_id : req.body.asignnee_id,
            followers_id : req.body.followers_id,
            tags : req.body.tags,
          })
          .then(result => {
            res.redirect('/')
            res.send('Ticket Created')
            console.log('Ticket Created')
          })
          .catch(error => console.error(error))
      });


      app.post('/rest/ticket/update', (req, res) => {
                const dt = new Date();
                db.collection('cmps415mongodb')
                .findOneAndUpdate(
                  { "ticketID" : req.body.ticketID },
                  {
                    $set: {
                      updated_at : dt,
                      type : req.body.type,
                      subject : req.body.subject,
                      description : req.body.description,
                      priority : req.body.priority,
                      status : req.body.status,
                      recipient : req.body.recipient,
                      submitter : req.body.submitter,
                      asignnee_id : req.body.asignnee_id,
                      followers_id : req.body.followers_id,
                      tags : req.body.tags,
                    },
                  },
                  {
                    upsert: true,
                  }
                )
                .then(result => {
                  res.redirect('/')
                  res.send('Ticket Updated')
                  console.log('Ticket Updated')
                })
                .catch(error => console.error(error))


      });

     


  })
  .catch(console.error);

