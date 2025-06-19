import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(data.sort((a, b) => b[sortBy] - a[sortBy]));
  }, [sortBy]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <select onChange={e => setSortBy(e.target.value)}>
        <option value="score">Score</option>
        <option value="time">Time</option>
      </select>
      <ul>
        {scores.map((s, i) => (
          <li key={i}>{s.name} - {s.score} - {s.time}s - {s.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
