import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AddPlayerForm from './components/AddPlayerForm';
import QuizEngine from './components/QuizEngine';
import ScoreSummary from './components/ScoreSummary';
import Leaderboard from './components/Leaderboard';
import AboutPage from './components/AboutPage';

export const AppContext = React.createContext();

function App() {
  const [player, setPlayer] = useState(null);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayer = JSON.parse(localStorage.getItem('player'));
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    if (storedPlayer) setPlayer(storedPlayer);
    setScores(storedScores);
  }, []);

  useEffect(() => {
    if (player) localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [player, scores]);

  return (
    <AppContext.Provider value={{ player, setPlayer, scores, setScores, navigate }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/quiz" element={<AddPlayerForm />} />
        <Route path="/quiz/start" element={<QuizEngine />} />
        <Route path="/quiz/summary" element={<ScoreSummary />} />
        <Route path="/scores" element={<Leaderboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '4rem' }}><h2>404 - Page Not Found</h2></div>} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
