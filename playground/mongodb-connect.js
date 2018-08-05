// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

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

  // db.collection('Todos').insertOne({
  //   name: 'Tao',
  //   title: 'Scientist'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log(`Unable to insert into the database ${err}}`);
  //   }
  //   console.log(JSON.stringify(result.ops, null, 2));
  //   console.log(JSON.stringify(result, null, 2));
  //   console.log(JSON.stringify(result.ops[0], null, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Tao',
  //   age: '27',
  //   location: '455 5th Ave, New York, NY 10016'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log('Successfully inserted into the database.');
  //   console.log(result.ops);
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.collection('Users').insertOne({
    name: 'Kath',
    title: 'Engineer',
    hobby: 'running'
  }, (err, result) => {
    console.log(result.ops);
  });

  client.close();
});
