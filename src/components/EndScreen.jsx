import React, { useEffect } from 'react';
import './EndScreen.css';

const EndScreen = ({ score, onRestart }) => {
  
  useEffect(() => {
    // Reproducir sonido de fin de juego
    playEndSound();
  }, []);

  const playEndSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {}
  };

  const playButtonSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {}
  };

  const getScoreMessage = () => {
    if (score >= 100) return { text: "Великолепно! Вы эксперт сибирской истории!", emoji: "🏆" };
    if (score >= 70) return { text: "Отлично! У вас хорошие знания!", emoji: "🥇" };
    if (score >= 40) return { text: "Хорошо! Есть что улучшить!", emoji: "🥈" };
    if (score >= 20) return { text: "Неплохо для начала!", emoji: "🥉" };
    return { text: "Не расстраивайтесь, попробуйте еще раз!", emoji: "📚" };
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="end-screen">
      <div className="end-container">
        <div className="game-over-header">
          <h1 className="game-over-title">⏰ Время вышло!</h1>
          <div className="confetti">🎊</div>
        </div>

        <div className="final-score-container">
          <div className="score-badge">
            <div className="score-emoji">{scoreMessage.emoji}</div>
            <div className="final-score">
              <span className="score-label">Финальный счет</span>
              <span className="score-number">{score}</span>
              <span className="score-unit">очков</span>
            </div>
          </div>
          
          <div className="score-message">
            <p>{scoreMessage.text}</p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{Math.floor(score / 10)}</span>
            <span className="stat-label">правильных ответов</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <span className="stat-value">5:00</span>
            <span className="stat-label">игрового времени</span>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="restart-button"
            onClick={() => {
              playButtonSound();
              onRestart();
            }}
          >
            🔄 Играть снова
          </button>
          
          <button 
            className="share-button"
            onClick={() => {
              playButtonSound();
              if (navigator.share) {
                navigator.share({
                  title: 'Play Sib - Сибирская викторина',
                  text: `Я набрал ${score} очков в игре Play Sib! Попробуй и ты!`,
                  url: window.location.href
                });
              } else {
                // Fallback para navegadores que no soportan Web Share API
                navigator.clipboard.writeText(`Я набрал ${score} очков в игре Play Sib! Попробуй и ты: ${window.location.href}`);
                alert('Ссылка скопирована в буфер обмена!');
              }
            }}
          >
            📤 Поделиться результатом
          </button>
        </div>

        <div className="game-info-footer">
          <p>
            <strong>Play Sib</strong> - викторина о торговой истории Томска
          </p>
          <p>Узнайте больше о купеческих династиях и развитии Сибири!</p>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
