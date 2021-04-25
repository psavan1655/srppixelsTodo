var express = require("express");
const {
  getAllTodo,
  createTodo,
  getTodoById,
  deleteTodoById,
  updateTodoById,
} = require("../controllers/todo");
var router = express.Router();

// define the home page route
router.get("/todo/:id", getTodoById);
router.get("/getalltodo", getAllTodo);

router.post("/todo", createTodo);

router.put("/todo/:id", updateTodoById);

router.delete("/todo/:id", deleteTodoById);

module.exports = router;
