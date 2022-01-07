const Task = require("../models/Task");
const { connection } = require("../db");

const addTask = async (task) => {
  await Task.create(task);
  console.log("Task added");
  await connection.close();
};

const listTasks = async () => {
  const tasks = await Task.find().lean();
  console.table(
    tasks.map((task) => ({
      title: task.title,
      description: task.description,
    }))
  );
  await connection.close();
  process.exit(0);
};

const findTask = async (text) => {
  const search = new RegExp(text, "ig");
  const tasks = await Task.find({
    $or: [{ title: search }, { description: search }],
  });
  if (tasks.length === 0) {
    console.log("No tasks found");
    await connection.close();
    process.exit(0);
  }
  console.table({
    id: tasks[0]._id.toString(),
    title: tasks[0].title,
    description: tasks[0].description,
  });

  await connection.close();
  process.exit(0);
};

const updateTask = async (_id, newTask) => {
  await Task.updateOne({ _id }, newTask);
  console.log("Task updated");
  await connection.close();
  process.exit(0);
};

const deleteTask = async (index) => {
  const tasks = await Task.find().lean();
  await Task.findByIdAndDelete(tasks[index]._id);
  console.log("Task deleted");
  await connection.close();
  process.exit(0);
};

module.exports = {
  addTask,
  listTasks,
  deleteTask,
  updateTask,
  findTask,
};
