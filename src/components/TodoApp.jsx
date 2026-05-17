import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load Todos
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save Todos
  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  // Add or Update Task
  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (editId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? { ...todo, text: task }
          : todo
      );

      setTodos(updatedTodos);
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTask("");
  };

  // Delete
  const handleDelete = (id) => {
    const filteredTodos = todos.filter(
      (todo) => todo.id !== id
    );

    setTodos(filteredTodos);
  };

  // Edit
  const handleEdit = (todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  // Complete
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    );

    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="todo-card">

        <h1 className="heading">
        Todo App
        </h1>

        {/* Input */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            className="todo-input"
          />

          <button onClick={handleAddTask} className="add-btn">
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <p className="empty-text">
            No tasks added 
          </p>
        ) : (
          todos.map((todo) => (
            <div
              className="todo-item"
              key={todo.id}
            >
              <div className="left-section">

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleComplete(todo.id)
                  }
                />

                <span
                  className={`todo-text ${
                    todo.completed
                      ? "completed"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              <div className="btn-group">

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(todo)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(todo.id)
                  }
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;