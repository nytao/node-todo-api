const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    console.log(`Successfully saved! ${doc}`);
    res.send(doc);
  }, (err) => {
    console.log(`Unable to save: ${err}`);
    res.status(400).send(err);
  });
});

app.listen(8000, () => {
  console.log(`The server is listening on port 8000...`);
});
