import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScoreSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Guard Clause: If there's no state or result, redirect to the start.
  useEffect(() => {
    if (!state || !state.result) {
      navigate('/quiz');
    }
  }, [state, navigate]);

  // If state is not yet available, render nothing to prevent a crash
  if (!state || !state.result) {
    return null; 
  }

  // Correctly access the nested result object
  const { result } = state;

  const message = result.score >= result.total / 2 ? 'Quiz Champion!' : 'More caffeine, maybe?';

  return (
    <div className="card">
      <h2>{message}</h2>
      <p>Name: {result.name}</p>
      <p>Final Score: {result.score} / {result.total}</p>
      <p>Total Time: {result.time} seconds</p>
      <button onClick={() => navigate('/quiz')}>
        Play Again
      </button>
    </div>
  );
}

export default ScoreSummary;