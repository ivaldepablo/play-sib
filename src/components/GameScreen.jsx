import React, { useState } from 'react';
import SpinWheel from './SpinWheel';
import QuestionCard from './QuestionCard';
import './GameScreen.css';

const GameScreen = ({ 
  playerName, 
  score, 
  gameTime, 
  questionTime, 
  categories, 
  currentQuestion, 
  selectedCategory,
  onSelectCategory, 
  onAnswerQuestion 
}) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = (category) => {
    setIsSpinning(true);
    // Simular tiempo de giro
    setTimeout(() => {
      setIsSpinning(false);
      onSelectCategory(category);
    }, 2000);
  };

  return (
    <div className="game-screen">
      {/* HUD - Header con información del jugador */}
      <div className="game-hud">
        <div className="player-info">
          <div className="player-name">
            <span className="icon">👤</span>
            <span>{playerName}</span>
          </div>
          <div className="player-score">
            <span className="icon">⭐</span>
            <span>{score} очков</span>
          </div>
        </div>
        
        <div className="game-timers">
          <div className="game-time">
            <span className="icon">⏰</span>
            <span>{gameTime}</span>
          </div>
          {currentQuestion && (
            <div className="question-time">
              <span className="icon">⏱️</span>
              <span>{questionTime}с</span>
            </div>
          )}
        </div>
      </div>

      {/* Área principal del juego */}
      <div className="game-content">
        {!currentQuestion ? (
          <div className="wheel-container">
            <h2 className="wheel-title">Крутите колесо фортуны!</h2>
            <SpinWheel 
              categories={categories}
              onSpin={handleSpin}
              isSpinning={isSpinning}
            />
          </div>
        ) : (
          <div className="question-container">
            <QuestionCard 
              question={currentQuestion}
              questionTime={questionTime}
              onAnswer={onAnswerQuestion}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
