const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Todo = sequelize.define("todo", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  todo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Todo;
