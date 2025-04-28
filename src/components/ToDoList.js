import React, { useState, useContext } from "react";
import { db } from "../firebase";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { doc, deleteDoc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import Analytics from './Analytics';
import { FaTrashAlt, FaPen } from 'react-icons/fa'; // Icon for edit and delete

const TodoList = ({ tasks, setTasks }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", user.uid, "userTasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditTask({ ...task });
  };

  const handleSaveEdit = async () => {
    const taskRef = doc(db, "tasks", user.uid, "userTasks", editTask.id);
    const docSnapshot = await getDoc(taskRef);
    if (!docSnapshot.exists()) {
      console.log("No such document!");
      return;
    }

    await updateDoc(taskRef, {
      title: editTask.title,
      date: editTask.date,
    });
    setTasks(tasks.map((task) => (task.id === editTask.id ? { ...task, title: editTask.title, date: editTask.date } : task)));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCheckBoxChange = async (task) => {
    const taskRef = doc(db, "tasks", user.uid, "userTasks", task.id);
    const docSnapshot = await getDoc(taskRef);
    if (!docSnapshot.exists()) {
      await setDoc(taskRef, {
        completed: !task.completed,
        title: task.title,
        date: task.date,
      });
    } else {
      await updateDoc(taskRef, {
        completed: !task.completed,
      });
    }
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: !task.completed } : t)));
  };

  return (
    <div className="mt-4">
      <Analytics tasks={tasks} />
      {isEditing ? (
        <div className="mb-4">
          <input
            type="text"
            className="form-control mb-2"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <input
            type="date"
            className="form-control mb-2"
            value={editTask.date}
            onChange={(e) => setEditTask({ ...editTask, date: e.target.value })}
          />
          <div className="d-flex gap-2">
            <Button variant="success" onClick={handleSaveEdit}>Save</Button>
            <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </div>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`d-flex justify-content-between align-items-center border p-3 mb-2 rounded shadow-sm transition-all ease-in-out duration-300`}
            style={{
              backgroundColor: task.completed ? "#28a745" : "", 
              opacity: task.completed ? "0.7" : "1",
              textDecoration: task.completed ? "line-through" : "none", // Strikethrough for completed tasks
            }}
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckBoxChange(task)}
                className="me-3"
              />
              <div>
                <strong>{task.title}</strong><br />
                <small className="text-muted">{new Date(task.date).toLocaleDateString("en-GB")}</small>
              </div>
            </div>
            <div className="d-flex gap-3">
              <Button variant="warning" onClick={() => handleEdit(task)}>
                <FaPen />
              </Button>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
