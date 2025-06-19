import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

function AddPlayerForm() {
  const { setPlayer, navigate } = useContext(AppContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [difficulty, setDifficulty] = useState('Easy');

  const handleSubmit = e => {
    e.preventDefault();
    if (name && category && difficulty) {
      const player = { name, category, difficulty };
      setPlayer(player);
      localStorage.setItem('player', JSON.stringify(player));
      navigate('/quiz/start');
    }
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <h2>Enter Quiz Info</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>General</option>
        <option>Science</option>
        <option>History</option>
      </select>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button type="submit" disabled={!name}>Start</button>
    </form>
  );
}

export default AddPlayerForm;
