const Todo = require("../models/todo");
const { post } = require("../routes/todo");

exports.getAllTodo = async (req, res) => {
  try {
    const todoData = await Todo.find();
    return res.json(todoData);
  } catch (err) {
    return res.status(400).json({
      error: "No data",
    });
  }
};

exports.createTodo = async (req, res) => {
  const todoData = new Todo(req.body);
  await todoData.save((err, todo) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Todo not created",
      });
    }
    res.json({ todo });
  });
};

exports.getTodoById = async (req, res) => {
  try {
    const todoData = await Todo.findOne({ _id: req.params.id });
    res.json({ todoData });
  } catch (error) {
    return res.status(400).json({
      error: "No todo with this id.",
    });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    const todoData = await Todo.deleteOne({ _id: req.params.id });
    res.json({ todoData });
  } catch (err) {
    return res.status(400).json({
      error: "Todo not deleted",
    });
  }
};

exports.updateTodoById = async (req, res) => {
  try {
    const todoData = await Todo.findOne({ _id: req.params.id });
    if (req.body.name) {
      todoData.name = req.body.name;
    }
    if (req.body.description) {
      todoData.description = req.body.description;
    }
    if (req.body.isCompleted) {
      todoData.isCompleted = req.body.isCompleted;
    }

    await todoData.save((err, todo) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Todo not created",
        });
      }
      res.json(todoData);
    });
  } catch {
    res.status(404);
    res.send({ error: "Todo doesn't exist!" });
  }
};
