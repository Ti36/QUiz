import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import questionsData from '../data/questions';

function QuizEngine() {
  const { player, navigate, setScores } = useContext(AppContext);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);

  const questions = questionsData[player?.category?.toLowerCase()]?.[player?.difficulty?.toLowerCase()] || [];
  const question = questions[index];

  useEffect(() => {
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
  }, [index]);

  const handleSelect = (opt) => {
    if (selected !== null) return;
    const timeTaken = 15 - timeLeft;
    setSelected(opt);
    setAnswers([...answers, { question: question.q, selected: opt, correct: question.ans, time: timeTaken }]);
  };

  const handleNext = () => {
    setSelected(null);
    setTimeLeft(15);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const correct = answers.filter(a => a.selected === a.correct).length;
      const totalTime = answers.reduce((acc, a) => acc + a.time, 0);
      const result = { name: player.name, score: correct, total: answers.length, time: totalTime, date: new Date().toLocaleString() };
      setScores(prev => [...prev, result]);
      localStorage.setItem('scores', JSON.stringify([...answers, result]));
      navigate('/quiz/summary', { state: result });
    }
  };

  return (
    <div className="quiz-engine">
      <h3>{question.q}</h3>
      <div className="options">
        {question.options.map(opt => (
          <button key={opt} onClick={() => handleSelect(opt)} className={selected ? (opt === question.ans ? 'correct' : opt === selected ? 'wrong' : '') : ''}>{opt}</button>
        ))}
      </div>
      <div className="bottom">
        <p>Time Left: {timeLeft}s</p>
        <p>Question {index + 1}/{questions.length}</p>
        {selected && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
}

export default QuizEngine;
