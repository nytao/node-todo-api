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

  // db.collection('Todos').deleteOne({
  //   completed: undefined
  // }, (err) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log(`Successfully deleted.`);
  // });

  // db.collection('Todos')
  // .find()
  // .count()
  // .then((data) => {
  //   console.log(data);
  // }, (err) => {});

  // db.collection('Todos').findOneAndDelete({
  //   completed: true
  // }).then((result) => {
  //   console.log('success: ');
  //   console.log(result);
  // }, (err) => {
  //   console.log('error: ');
  //   console.log(err);
  // });

  // db.collection('Users').deleteMany({
  //   name: 'Tao'
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // });

  // db.collection('Users').findOneAndDelete({
  //   name: 'Jenny'
  // }).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectId("5b6768997d292b82db6e2c64")
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId("5b673ead8eb7e60206c3aeaa")
  }, {
    $set: {
      name: 'Jasmine',
      completed: true,
      title: 'Teacher'
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId("5b6768997d292b82db6e2c64")
  }, {
    $set : {
      name: 'Tao'
    },
    $inc: {
      points: 1
    }
  }, {
    returnOriginal: false
  }).then(result => {
    console.log('updated successfully!');
    console.log(result);
  }, err => {
    console.log(err);
  });

  client.close();
});
