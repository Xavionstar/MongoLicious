const mongoose = require('mongoose')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/MongoLicious';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const router= require('./routes/index')

const express = require('express');

const PORT = process.env.port || 1324;
const app = express();
app.use(express.json());
app.use(router);


 
mongoose.connect(url, () => {
  console.log("connected")
  app.listen(PORT, () => console.log("Now listening"));
});






























// async function startServer() {



// await client.connect()
//   .then(() => {
    
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error(err);
//   });


//   app.get('/user', (req, res) => {
    
//     const collection = client.db('MongoLicious').collection('user');
//     collection.find().toArray()
//     .then(document => {
//       res.send(document);
//     })
//   });



//   // Close the MongoDB client when the server is closed
//   const server = app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//   });
//   server.on('close', () => {
//     console.log('Closing MongoDB client');
//     client.close();
//   });
// }
// startServer();
