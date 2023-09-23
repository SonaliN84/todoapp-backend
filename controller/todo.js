const User = require("../models/todo");
const Todo = require("../models/todo");

exports.postAddTodo = async (req, res, next) => {
  try {
    const todo = req.body.todo;
    console.log(todo);
    if (todo.trim().length <= 0 || todo == null || todo == undefined) {
      return res.status(400).json({ err: "Enter valid todo" });
    }
    const newTodo = await req.user.createTodo({
      todo: todo,
      completed: false,
    });

    return res.status(201).json({ todo: newTodo, success: "true" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await req.user.getTodos();
    res.status(200).json({ todos: todos, success: true });
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.putTodoStatus = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const status = req.body.completed;
    const todo = await Todo.findByPk(todoId);

    todo.completed = status;
    await todo.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todo.findByPk(todoId);

    await todo.destroy();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.putEditTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const newTodo = req.body.todo;
    const todo = await Todo.findByPk(todoId);

    todo.todo = newTodo;
    const t = await todo.save();
    console.log("t>>>>", t);
    res.status(200).json({ message: "todo edited", success: true, todo: t });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
