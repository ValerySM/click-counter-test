import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://ValerySM.pythonanywhere.com/api/clicks';

function App() {
  const [count, setCount] = useState(0);
  const [telegramId, setTelegramId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('telegram_id');
    setTelegramId(id);

    if (id) {
      fetchClicks(id);
    }
  }, []);

  const fetchClicks = async (id) => {
    try {
      const response = await axios.get(`${API_URL}?telegram_id=${id}`);
      setCount(response.data.clicks);
    } catch (error) {
      console.error('Error fetching clicks:', error);
    }
  };

  const saveClicks = async () => {
    try {
      await axios.post(API_URL, {
        telegram_id: telegramId,
        clicks: count
      });
    } catch (error) {
      console.error('Error saving clicks:', error);
    }
  };

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    saveClicks();
  };

  return (
    <div className="App">
      <h1>Счетчик кликов</h1>
      <p>Вы кликнули {count} раз</p>
      <button onClick={handleClick}>
        Кликни меня
      </button>
    </div>
  );
}

export default App;