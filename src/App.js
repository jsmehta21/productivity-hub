  import React, { useState, useContext, useEffect } from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
  import { AuthContext } from "./context/AuthContext";
  import { db } from "./firebase";
  import { collection, getDocs, addDoc } from "firebase/firestore";
  import "bootstrap/dist/css/bootstrap.min.css";
  import TodoForm from "./components/ToDoForm";
  import TodoList from "./components/ToDoList";
  import Home from "./components/Home";
  import Login from "./components/auth/login";
  import Signup from "./components/auth/signup";
  import PrivateRoute from "./components/PrivateRoute";
  import UserProfile from "./components/UserProfile";
  import MyNavbar from './components/MyNavbar';
  import SelectPage from './components/SelectPage';
  import Pomodoro from './components/Pomodoro';
  import Analytics from "./components/Analytics";

  function App() {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    // Fetch tasks from Firestore based on user and filter
    useEffect(() => {
      const fetchTasks = async () => {
        if (!user) return;

        const tasksCollection = collection(db, "tasks", user.uid, "userTasks");
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => new Date(a.date) - new Date(b.date));

        if (filter === "completed") {
          setTasks(tasksList.filter(task => task.completed));
        } else if (filter === "pending") {
          setTasks(tasksList.filter(task => !task.completed));
        } else {
          setTasks(tasksList);
        }
      };

      fetchTasks();
    }, [user, filter]);

    // Add task to Firestore and update local state
    const addTask = async (task) => {
      if (!user) return;

      try {
        const docRef = await addDoc(collection(db, "tasks", user.uid, "userTasks"), {
          title: task.title,
          date: task.date,
          completed: false,
        });
        setTasks([...tasks, { id: docRef.id, ...task }]);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    };

    return (
      <Router> {/* Wrap everything inside Router */}
        <div className="container mt-2">
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} />
            <Route path="/select" element={<SelectPage />} />
          </Routes>

          {user ? (
            <>
              <h2 className="text-center mb-4 my-2">My Productivity Hub 🚀</h2>
              <TodoForm addTask={addTask} />

              {/* Task Filter */}
              <div className="mb-2">
                <select
                  className="form-select mb-2 my-2"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <TodoList tasks={tasks} setTasks={setTasks} />
            </>
          ) : (
            <p>Please log in to see your tasks.</p>
          )}
        </div>
      </Router>
    );
  }

  export default App;
