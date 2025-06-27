import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AddPlayerForm from './components/AddPlayerForm';
import QuizEngine from './components/QuizEngine';
import ScoreSummary from './components/ScoreSummary';
import Leaderboard from './components/Leaderboard';
import AboutPage from './components/AboutPage';
import NotFound from './components/NotFound';

function App() {
  return (
    // The AppProvider is no longer needed here, so we wrap with a fragment <>
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/quiz" element={<AddPlayerForm />} />
          <Route path="/quiz/start" element={<QuizEngine />} />
          <Route path="/quiz/summary" element={<ScoreSummary />} />
          <Route path="/scores" element={<Leaderboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;