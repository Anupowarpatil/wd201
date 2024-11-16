const todoList = require("../todo.js");

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test("Creating a new todo", () => {
    todos.add({ title: "Test todo", dueDate: "2024-11-16", completed: false });
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe("Test todo");
  });

  test("Marking a todo as completed", () => {
    todos.add({ title: "Test todo", dueDate: "2024-11-16", completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    todos.add({ title: "Overdue todo", dueDate: "2024-11-15", completed: false });
    expect(todos.overdue().length).toBe(1);
  });

  test("Retrieval of due today items", () => {
    todos.add({ title: "Due today", dueDate: "2024-11-16", completed: false });
    expect(todos.dueToday().length).toBe(1);
  });

  test("Retrieval of due later items", () => {
    todos.add({ title: "Due later", dueDate: "2024-11-17", completed: false });
    expect(todos.dueLater().length).toBe(1);
  });
});
