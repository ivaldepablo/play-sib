import React, { useState } from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      onStart(nickname.trim());
    }
  };

  const playButtonSound = () => {
    // Sonido de clic para botón
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {
      // Silenciar errores de audio
    }
  };

  return (
    <div className="start-screen">
      <div className="start-container">
        <div className="game-logo">
          <h1>🎯 Play Sib</h1>
          <p>Сибирская викторина</p>
        </div>
        
        <div className="welcome-text">
          <h2>Добро пожаловать!</h2>
          <p>Проверьте свои знания о торговой истории Томска</p>
        </div>

        <form onSubmit={handleSubmit} className="nickname-form">
          <div className="input-group">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Введите ваш никнейм..."
              className="nickname-input"
              maxLength={20}
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            className="start-button"
            disabled={!nickname.trim()}
            onClick={playButtonSound}
          >
            🚀 А Играть!
          </button>
        </form>

        <div className="game-info">
          <div className="info-item">
            <span className="icon">⏰</span>
            <span>5 минут игры</span>
          </div>
          <div className="info-item">
            <span className="icon">❓</span>
            <span>20 секунд на вопрос</span>
          </div>
          <div className="info-item">
            <span className="icon">🎯</span>
            <span>10 очков за правильный ответ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
