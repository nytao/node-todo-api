const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");
const { ObjectId } = require("mongodb");

// let id = "5xb85d5c101feae67cc8e384d";
// Todo.find({
//   _id: id
// })
//   .then(todos => {
//     console.log("todos", todos);
//   })
//   .catch(e => console.log("error"));

// Todo.findOne({
//   _id: id
// })
//   .then(todo => console.log("todo", todo))
//   .catch(e => console.log("error"));

// Todo.findById(id)
//   .then(todo => {
//     console.log("todo by id", todo);
//   })
//   .catch(e => console.log(e));

// console.log(ObjectId.isValid(id));

let userId = "5b6b71c6261fbc2127054fc1";

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log("User not found.");
    }
    return console.log("User found:", JSON.stringify(user, null, 2));
  })
  .catch(e => console.log("ID is not valid."));
