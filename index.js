const express = require("express");
const cors = require("cors");
const Task = require("./schemas/Task.model");
const Note = require("./schemas/Notes.model");
const app = express();
const port = 8080;

function myMiddleware(req, res, next) {
  console.log("This is my custom middleware.");
  if (req.query.token === `${process.env.API_TOKEN_KEY}`) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.use(express.json());
app.use(cors());
app.use(myMiddleware);

const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("Connected!"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const saveTask = async (title, description, dueDate, completed) => {
  try {
    const data = new Task({
      title,
      description,
      dueDate,
      completed,
    });
    const result = await data.save();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const saveNote = async (id, title, emoji, content, intrash) => {
  try {
    const data = new Note({
      id,
      title,
      emoji,
      content,
      intrash: false,
    });
    const result = await data.save();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

app.post("/add-task", (req, res) => {
  console.log(req.body);
  if (
    !req.body.title ||
    !req.body.dueDate ||
    typeof req.body.completed === Boolean
  ) {
    res.status(400).send("Please enter a title or a date");
  }
  try {
    saveTask(
      req.body.title,
      req.body.description,
      req.body.dueDate,
      req.body.completed
    );
    res.status(200).send({
      message: "Note saved",
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/get-all-tasks", async (req, res) => {
  try {
    const data = await Task.find().sort({ dueDate: -1 });
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete-task", async (req, res) => {
  try {
    const data = await Task.deleteOne({ _id: req.query.id });
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});

app.put("/update-task", async (req, res) => {
  try {
    const data = await Task.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.status(200).send({
      message: "Task updated successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/add-note", (req, res) => {
  console.log(req.body);
  if (!req.body.title && !req.body.content) {
    res.status(400).send("Please fill all details");
  }
  try {
    saveNote(
      req.body.id,
      req.body.title,
      req.body.emoji,
      req.body.content,
      req.body.intrash
    );
    res.status(200).send({
      message: "Note saved",
    });
  } catch (error) {
    res.send(error);
  }
});


app.put("/update-note", async (req, res) => {
  try {
    const data = await Note.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.status(200).send({
      message: "Note updated successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/get-note", async (req, res) => {
  try {
    const data = await Note.findById(req.query.id);
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});

app.get("/get-all-notes", async (req, res) => {
  try {
    const data = await Note.find();
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});


app.delete("/delete-note", async (req, res) => {
  try {
    const data = await Note.deleteOne({ _id: req.query.id });
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.send(error);
  }
});
// const server = Bun.serve({
//   port: 3000,
//   fetch(req) {
//     return new Response("Bun!");
//   },
// });

console.log(`Listening on http://localhost:${port} ...`);
