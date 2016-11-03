// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
//
// // Connection URL
// const url = "mongodb://127.0.0.1:3001/meteor";
//
// // Use connect method to connect to the server
// MongoClient.connect(url, function (err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const collection =  db.collection("Accounts");
//
//   collection.find({}).toArray(function (error, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//   });
//
//   db.close();
// });
