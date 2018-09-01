const expect = require("expect");
const supertest = require("supertest");
const { ObjectId } = require("mongodb");

const { app } = require("../server");
const { Todo } = require("../models/todo");

const todos = [
  {
    _id: new ObjectId(),
    text: "first test todo"
  },
  {
    _id: new ObjectId(),
    text: "second test todo"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Test todo text.";
    supertest(app)
      .post("/todos")
      .send({
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create a collection", done => {
    var text = "ab";
    supertest(app)
      .post("/todos")
      .send({ text })
      .expect(400)
      .expect(res => {
        expect(res.body.text).toEqual(undefined);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(res => {
            expect(res.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    supertest(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return a doc", done => {
    supertest(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      // .expect((req, res) => {
      //   expect(res.body.todos.text).toBe(todos[0].text);
      // })
      .expect(res => {
        // console.log(res.body.todo._id.toString());
        expect(res.body.todo.text).toEqual(todos[0].text);
        expect(res.body.todo._id.toString()).toEqual(todos[0]._id.toString());
      })
      .end(done);
  });

  it("should return 404 if todo not found", done => {
    let array = todos[0]._id.toString().split("");
    array.splice(0, 2, "5", "7");
    supertest(app)
      .get(
        // `/todos/${new ObjectId()}`
        `/todos/${array.join("")}`
        // `/todos/5789e75f28d57975ce9507d1`
      )
      .expect(404)
      .end(done);
  });

  it("should return 400 if an invalid id is provided", done => {
    supertest(app)
      .get(`/todos/${new ObjectId()}7`)
      .expect(400)
      .end(done);
  });
});
