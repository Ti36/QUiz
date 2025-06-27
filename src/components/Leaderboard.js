import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

function Leaderboard() {
  const { scores } = useContext(AppContext);
  const [sortBy, setSortBy] = useState('score'); // 'score' or 'time'

  const sortedScores = useMemo(() => {
    const sorted = [...scores].sort((a, b) => {
      if (sortBy === 'time') {
        return a.time - b.time; // Ascending for time (lower is better)
      }
      return b.score - a.score; // Descending for score (higher is better)
    });
    return sorted;
  }, [scores, sortBy]);

  return (
    <div className="card">
      <h2>Leaderboard</h2>
      
      <div className="form-group" style={{ maxWidth: '200px', margin: '0 auto 2rem auto' }}>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="score">Score</option>
            <option value="time">Time</option>
          </select>
      </div>

      {sortedScores.length > 0 ? (
        <ol style={{ listStyle: 'none', padding: 0 }}>
          {sortedScores.map((s) => (
            <li key={s.date} style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
              <strong>{s.name}</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span>Score: {s.score} / {s.total}</span>
                <span>Time: {s.time}s</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                {new Date(s.date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p style={{ textAlign: 'center' }}>No scores recorded yet. Be the first!</p>
      )}
    </div>
  );
}

export default Leaderboard;