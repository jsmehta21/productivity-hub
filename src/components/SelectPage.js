import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SelectPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Select Your Activity</h1>
      
      {/* Navigation Buttons */}
      <div className="d-flex flex-column gap-4 align-items-center mb-5">
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

export default SelectPage;
