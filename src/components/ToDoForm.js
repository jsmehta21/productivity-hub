import React, { useState } from "react";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !date) return;

    addTask({ title: task, date }); // No extra formatting here
    setTask("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-0 mt-0 my-0">
      <div className="row g-2 align-items-center mt-0 my-0">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="col-md-6 mt-2">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-12 mt-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
