import React, { useState } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, questionTime, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Reproducir sonido según si es correcto o incorrecto
    if (answer === question.answer) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
    
    // Notificar al componente padre después de mostrar el resultado
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  const playCorrectSound = () => {
    try {
      // Sonido para respuesta correcta
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {}
  };

  const playIncorrectSound = () => {
    try {
      // Sonido para respuesta incorrecta
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {}
  };

  const getButtonClass = (option) => {
    if (!showResult) return 'answer-option';
    
    if (option === question.answer) {
      return 'answer-option correct';
    } else if (option === selectedAnswer) {
      return 'answer-option incorrect';
    }
    return 'answer-option';
  };

  const getTimerClass = () => {
    if (questionTime <= 5) return 'question-timer critical';
    if (questionTime <= 10) return 'question-timer warning';
    return 'question-timer';
  };

  return (
    <div className="question-card">
      {/* Timer visual */}
      <div className={getTimerClass()}>
        <div className="timer-circle">
          <div 
            className="timer-fill"
            style={{ 
              '--progress': `${(questionTime / 20) * 100}%`,
              '--color': questionTime <= 5 ? '#ff4757' : questionTime <= 10 ? '#ffa502' : '#2ed573'
            }}
          ></div>
          <span className="timer-text">{questionTime}</span>
        </div>
      </div>

      {/* Categoría */}
      <div className="question-category">
        📚 {question.category}
      </div>

      {/* Pregunta */}
      <div className="question-text">
        <h3>{question.question}</h3>
      </div>

      {/* Opciones de respuesta */}
      <div className="answer-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleAnswerClick(option)}
            disabled={showResult}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
            {showResult && option === question.answer && (
              <span className="correct-icon">✅</span>
            )}
            {showResult && option === selectedAnswer && option !== question.answer && (
              <span className="incorrect-icon">❌</span>
            )}
          </button>
        ))}
      </div>

      {/* Mensaje de resultado */}
      {showResult && (
        <div className="result-message">
          {selectedAnswer === question.answer ? (
            <div className="correct-message">
              🎉 ¡Правильно! +10 очков
            </div>
          ) : (
            <div className="incorrect-message">
              😞 Неправильно. Правильный ответ: {question.answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
