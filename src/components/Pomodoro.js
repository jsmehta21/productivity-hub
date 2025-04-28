import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Pomodoro = ({ show, handleClose }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);
    const [sessionCount, setSessionCount] = useState(0);

    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);

    useEffect(() => {
        let timer;

        if (isActive) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        if (isWorkSession) {
                            setIsWorkSession(false);
                            setSessionCount((prevCount) => prevCount + 1);
                            return breakTime * 60;
                        } else {
                            setIsWorkSession(true);
                            return workTime * 60;
                        }
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isActive, isWorkSession, workTime, breakTime]);

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(workTime * 60);
        setIsWorkSession(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Pomodoro Timer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="pomodoro text-center">
                    <h2>{isWorkSession ? 'Work Session' : 'Break Session'}</h2>
                    <div style={{ width: 220, height: 220, margin: '20px auto' }}>
                        <CircularProgressbar
                            value={(timeLeft / (isWorkSession ? workTime * 60 : breakTime * 60)) * 100}
                            text={formatTime(timeLeft)}
                            styles={buildStyles({
                                textColor: '#333',
                                pathColor: isWorkSession ? '#f54e4e' : '#4aec8c',
                                trailColor: '#eee',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                            })}
                        />
                    </div>
                    <div className="d-flex justify-content-center gap-3 my-3">
                        <Button variant="primary" onClick={handleStartPause}>
                            {isActive ? 'Pause' : 'Start'}
                        </Button>
                        <Button variant="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                    <p>Pomodoros Completed: <strong>{sessionCount}</strong></p>

                    <div className="settings mt-4">
                        <h5>Customize Timer</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <div>
                                <label>Work (min)</label>
                                <input
                                    type="number"
                                    value={workTime}
                                    onChange={(e) => setWorkTime(Number(e.target.value))}
                                    min="1"
                                    className="form-control"
                                    style={{ width: 80 }}
                                />
                            </div>
                            <div>
                                <label>Break (min)</label>
                                <input
                                    type="number"
                                    value={breakTime}
                                    onChange={(e) => setBreakTime(Number(e.target.value))}
                                    min="1"
                                    className="form-control"
                                    style={{ width: 80 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Pomodoro;
