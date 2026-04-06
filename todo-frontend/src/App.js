import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch tasks with pagination
  const getTasks = async (pageNum = page) => {
    const res = await fetch(`http://localhost:5000/tasks?page=${pageNum}&limit=10`);
    const data = await res.json();
    setTasks(data.tasks);
    setTotalPages(data.totalPages);
    setPage(data.page);
  };

  useEffect(() => {
    getTasks(page);
    // eslint-disable-next-line
  }, [page]);

  // Add or Update Task
  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (editId) {
      // Update
      await fetch(`http://localhost:5000/tasks/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      setEditId(null);
    } else {
      // Add
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
    }

    setText("");
    getTasks(1); // Go to first page after add/update
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    // If last item on page, go to previous page if needed
    if (tasks.length === 1 && page > 1) {
      setPage(page - 1);
    } else {
      getTasks(page);
    }
  };

  // Edit Task
  const editTask = (task) => {
    setText(task.text);
    setEditId(task._id);
  };

  // Toggle Complete
  const toggleTask = async (task) => {
    await fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task.text,
        completed: !task.completed,
      }),
    });
    getTasks();
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">📝 To-Do App</h1>

      <div className="todo-input-box">
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
        />
        <button className="todo-add-btn" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="todo-list-wrapper">
        <div className="todo-list-header">
          <span className="todo-sno-col">S.No.</span>
          <span className="todo-task-col">Task</span>
          <span className="todo-action-col">Actions</span>
        </div>
        <ul className="todo-list">
          {tasks.map((task, idx) => (
            <li key={task._id} className="todo-list-item">
              <span className="todo-sno-col">{(page - 1) * 10 + idx + 1}</span>
              <span
                className={"todo-text todo-task-col" + (task.completed ? " completed" : "")}
                onClick={() => toggleTask(task)}
              >
                {task.text}
              </span>
              <span className="todo-action-col">
                <button className="todo-edit-btn" onClick={() => editTask(task)}>
                  ✏️
                </button>
                <button
                  className="todo-delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  ❌
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}



export default App;