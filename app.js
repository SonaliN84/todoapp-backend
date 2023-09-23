const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");

const User = require("./models/user");
const Todo = require("./models/todo");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(todoRoutes);
app.use(userRoutes);

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
