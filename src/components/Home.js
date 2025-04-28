import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Container } from 'react-bootstrap';
import Analytics from './Analytics';
import Pomodoro from './Pomodoro';

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // Only redirect to login if NOT logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch all tasks once
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksList = [];
        querySnapshot.forEach((doc) => {
          tasksList.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasksList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
      setLoading(false);
    };

    fetchTasks();
  }, []);

  return (
    <Container className="text-center mt-0"> {/* Adjusted margin-top */}
      <h1 className="mb-3">Welcome to Productivity Hub 🚀</h1> {/* Reduced margin-bottom */}
      
      {/* Navigation Buttons */}
      <div className="d-flex flex-column gap-3 align-items-center mb-4"> {/* Reduced gap */}
        <Button variant="primary" size="lg" onClick={() => navigate('/todo')}>
          Go to To-Do List 📝
        </Button>

        <Button variant="success" size="lg" onClick={() => navigate('/pomodoro')}>
          Start Pomodoro Timer ⏳
        </Button>
      </div>
    </Container>
  );
};

export default Home;
