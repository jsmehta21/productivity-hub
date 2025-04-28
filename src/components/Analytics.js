import React from "react";

const Analytics = ({ tasks }) => {
  // Group tasks by date
  const taskStatsByDate = {};

  tasks.forEach(task => {
    const date = task.date;
    if (!taskStatsByDate[date]) {
      taskStatsByDate[date] = { completed: 0, pending: 0 };
    }
    if (task.completed) {
      taskStatsByDate[date].completed += 1;
    } else {
      taskStatsByDate[date].pending += 1;
    }
  });

  const sortedDates = Object.keys(taskStatsByDate).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div className="analytics-card">
      <h3 className="text-center my-2" style={{ fontSize: '1.1rem' }}>Task Analytics</h3>
      {sortedDates.length === 0 ? (
        <p className="text-center" style={{ fontSize: '0.9rem' }}>No tasks available for analytics.</p>
      ) : (
        <table className="table table-sm table-striped analytics-table" style={{ fontSize: '0.85rem' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Completed</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            {sortedDates.map(date => (
              <tr key={date}>
                <td>{new Date(date).toLocaleDateString("en-GB")}</td>
                <td>{taskStatsByDate[date].completed}</td>
                <td>{taskStatsByDate[date].pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Analytics;
