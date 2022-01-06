const { program } = require("commander");
const { prompt } = require("inquirer");
const {
  addTask,
  listTasks,
  deleteTask,
  updateTask,
  findTask,
} = require("./controllers/task.controller");

program
  .version("0.0.1")
  .description("A simple command line tool to manage your tasks");

const taskQuestions = [
  { type: "input", message: "Enter task name", name: "title" },
  {
    type: "input",
    message: "Enter a task description",
    name: "description",
  },
];

program
  .command("add")
  .alias("a")
  .action(async () => {
    const answers = await prompt(taskQuestions);
    addTask(answers);
  });

program
  .command("list")
  .alias("l")
  .action(() => {
    listTasks();
  });

program
  .command("update <id>")
  .alias("u")
  .action(async (_id) => {
    const answers = await prompt(taskQuestions);
    await updateTask(_id, answers);
  });

program
  .command("delete <id>")
  .alias("d")
  .action((_id) => {
    deleteTask(_id);
  });

program
  .command("find <text>")
  .alias("f")
  .action((text) => {
    findTask(text);
  });

program.parse(process.argv);
