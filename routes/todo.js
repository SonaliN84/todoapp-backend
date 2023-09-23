const express = require("express");

const router = express.Router();

const todoController = require("../controller/todo");

const authMiddleware = require("../middleware/auth");

router.post(
  "/addTodo",
  authMiddleware.authenticate,
  todoController.postAddTodo
);

router.get("/getTodos", authMiddleware.authenticate, todoController.getTodos);

router.put(
  "/editTodo/:todoId",
  authMiddleware.authenticate,
  todoController.putEditTodo
);

router.put(
  "/todo-status/:todoId",
  authMiddleware.authenticate,
  todoController.putTodoStatus
);

router.delete(
  "/delete-todo/:todoId",
  authMiddleware.authenticate,
  todoController.deleteTodo
);

module.exports = router;
