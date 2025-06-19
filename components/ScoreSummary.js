import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScoreSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const message = state.score >= state.total / 2 ? 'Quiz Champion!' : 'More caffeine, maybe?';

  return (
    <div className="summary">
      <h2>{message}</h2>
      <p>Name: {state.name}</p>
      <p>Score: {state.score} / {state.total}</p>
      <p>Total Time: {state.time}s</p>
      <button onClick={() => navigate('/')}>Play Again</button>
    </div>
  );
}

export default ScoreSummary;
