// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectId } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);
// console.log(obj.generationTime);
// console.log(obj.getTimestamp());

MongoClient.connect("mongodb://localhost:27017/xyz", {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    return console.log("Unable to connect to the database: " + err);
  }
  console.log("Successfully connected to the database!");

  const db = client.db("TodoApp");

  // db.collection('Todos').find({
  //   _id: new ObjectId('5b673f042d66fe020abfa66b')
  // }).toArray()
  //   .then((data) => {
  //     console.log(JSON.stringify(data, null, 2));
  //   })
  //   .catch((() => {}));

  db.collection('Users').find({
    abc: null
  }).toArray()
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      console.log(`Unable to find items.`, err);
    });

  client.close();
});
