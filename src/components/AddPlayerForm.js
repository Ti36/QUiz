import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
// This is the line that has been fixed
import quizData from '../data/questions';

function AddPlayerForm() {
  const { setPlayer } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const quizCategories = Object.keys(quizData);

  const handleSubmit = e => {
    e.preventDefault();
    if (name && category && difficulty) {
      setPlayer({ name, category, difficulty });
      navigate('/quiz/start');
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>Enter Quiz Info</h2>
        <div className="form-group">
          <label htmlFor="name">Player Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="" disabled>Select a Category</option>
            {quizCategories.map(cat => (
              <option key={cat} value={cat.charAt(0).toUpperCase() + cat.slice(1)}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="" disabled>Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <button type="submit" disabled={!name || !category || !difficulty}>
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default AddPlayerForm;