const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    doc => {
      // console.log(`Successfully saved! ${doc}`);
      res.send(doc);
    },
    err => {
      console.log(`Unable to save: ${err}`);
      res.status(400).send(err);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      // console.log(`Successfully fetched! ${todos}`);
      res.send({ todos });
    },
    err => {
      console.log(`Unable to connect to the database. ${err}`);
      res.status(400).send(err);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  // res.send(req.params);
  let id = req.params.id;
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        // return console.log("Todo not found!");
        return res.status(404).send({});
      }
      // return console.log(`Todo found: ${JSON.stringify(todo, null, 2)}.`);
      return res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send({}));
});

app.listen(8000, () => {
  console.log(`The server is listening on port 8000...`);
});

module.exports = { app };
