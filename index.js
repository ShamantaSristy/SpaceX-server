const express = require('express')
const app = express()
const port = process.env.PORT ||5500
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sei3l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const userCollection = client.db("spaceX").collection("spaceXUsers");

// user adding part 
app.post('/addUsers',(req,res) => {
    const newBorrow = req.body;
    console.log("Users uploading",newBorrow);
    userCollection.insertOne(newBorrow)
    .then(result => {
      console.log("User adding " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/users',(req,res) => {
    userCollection.find()
    .toArray((err, items) => {
      res.send(items);
      console.log(items);
    })
    
  });

  app.get('/', (req, res) => {
    res.send('Hello I am from Server')
  })
  // perform actions on the collection object
//   client.close();
});

app.listen(port, () => {
    console.log("Connected to database")
  })