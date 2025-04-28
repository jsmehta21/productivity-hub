import React, { useState, useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import Pomodoro from './Pomodoro'; // Import Pomodoro component
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const { user, logout } = useContext(AuthContext); // Use user and logout from context
  const [showPomodoro, setShowPomodoro] = useState(false);
  const navigate = useNavigate();

  const handlePomodoroShow = () => setShowPomodoro(true);
  const handlePomodoroClose = () => setShowPomodoro(false);

  // Handle logout functionality
  const handleLogout = async () => {
    await logout(); // Call logout function from context
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Nav className="ml-auto mx-2">
        <div className="d-flex align-items-center">
          {/* Pomodoro button */}
          <Button variant="outline-light" onClick={handlePomodoroShow}>
            Pomodoro Timer
          </Button>

          {/* Conditionally render Login/Logout buttons based on user authentication */}
          {user ? (
            <Button variant="outline-light" onClick={handleLogout} className="ms-3">
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" href="/login" className="ms-3">
                Login
              </Button>
              <Button variant="outline-light" href="/signup" className="ms-3">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Nav>

      {/* Pomodoro Modal */}
      <Pomodoro show={showPomodoro} handleClose={handlePomodoroClose} />
    </Navbar>
  );
};

export default MyNavbar;
