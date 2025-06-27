import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import questionsData from '../data/questions';

function QuizEngine() {
  const { player, setScores } = useContext(AppContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (!player) {
      navigate('/quiz');
      return;
    }
    const loadedQuestions = questionsData[player.category.toLowerCase()]?.[player.difficulty.toLowerCase()] || [];
    setQuestions(loadedQuestions);
  }, [player, navigate]);

  const handleNext = useCallback(() => {
    if (index + 1 < questions.length) {
      setIndex(prevIndex => prevIndex + 1);
      setSelected(null);
      setTimeLeft(15);
    } else {
      const correctAnswers = answers.filter(a => a.selected === a.correct).length;
      const totalTime = answers.reduce((acc, a) => acc + a.time, 0);

      const result = {
        name: player.name,
        score: correctAnswers,
        total: questions.length,
        time: totalTime,
        date: new Date().toISOString()
      };
      
      setScores(prevScores => [...prevScores, result]);
      navigate('/quiz/summary', { state: { result } });
    }
  }, [index, questions.length, answers, player, setScores, navigate]);

  useEffect(() => {
    if (questions.length === 0 || selected !== null) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selected, handleNext, questions.length]);

  const handleSelect = (option) => {
    if (selected !== null) return;

    const currentQuestion = questions[index];
    const timeTaken = 15 - timeLeft;
    setSelected(option);
    setAnswers([...answers, {
      question: currentQuestion.q,
      selected: option,
      correct: currentQuestion.ans,
      time: timeTaken
    }]);
  };
  
  if (questions.length === 0) {
    return <div className="card">Loading questions or player not found...</div>;
  }
  
  const currentQuestion = questions[index];

  return (
    <div className="card">
      <h3>{currentQuestion.q}</h3>
      <div className="options-grid">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={selected !== null}
            className={`option-btn ${selected ? (option === currentQuestion.ans ? 'correct' : option === selected ? 'incorrect' : '') : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>Time Left: {timeLeft}s</p>
        <p>Question {index + 1} of {questions.length}</p>
        {selected && <button onClick={handleNext}>Next Question</button>}
      </div>
    </div>
  );
}

export default QuizEngine;