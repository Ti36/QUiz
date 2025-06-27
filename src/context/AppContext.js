import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [scores, setScores] = useState([]);

  // Load data from localStorage on initial app load
  useEffect(() => {
    try {
      const storedPlayer = JSON.parse(localStorage.getItem('player'));
      if (storedPlayer) {
        setPlayer(storedPlayer);
      }
      const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
      setScores(storedScores);
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  // Save data to localStorage whenever player or scores change
  useEffect(() => {
    if (player) {
      localStorage.setItem('player', JSON.stringify(player));
    }
    // Only save scores if the array has content, to avoid overwriting with an empty array on first load
    if (scores.length > 0) {
      localStorage.setItem('scores', JSON.stringify(scores));
    }
  }, [player, scores]);

  const value = {
    player,
    setPlayer,
    scores,
    setScores,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};