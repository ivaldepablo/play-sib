import React, { useState, useEffect, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import questions from './data/questions.json';
import './App.css';

// Categorías únicas del juego
const CATEGORIES = [
  "Жизнь социальных классов",
  "Домашнее хозяйство", 
  "Знаменитые купеческие династии",
  "Томск - крупный сибирский торговый центр",
  "Развитие предпринимательства"
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start', 'game', 'end'
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(300); // 5 minutos en segundos
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questionTime, setQuestionTime] = useState(20);
  
  // Timer del juego principal
  useEffect(() => {
    let interval;
    if (currentScreen === 'game' && gameTime > 0) {
      interval = setInterval(() => {
        setGameTime(prevTime => {
          if (prevTime <= 1) {
            setCurrentScreen('end');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen, gameTime]);

  // Timer de la pregunta
  useEffect(() => {
    let interval;
    if (currentScreen === 'game' && currentQuestion && questionTime > 0) {
      interval = setInterval(() => {
        setQuestionTime(prevTime => {
          if (prevTime <= 1) {
            nextQuestion();
            return 20;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen, currentQuestion, questionTime]);

  const startGame = (name) => {
    setPlayerName(name);
    setCurrentScreen('game');
    setScore(0);
    setGameTime(300);
    setQuestionTime(20);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    const categoryQuestions = questions.filter(q => q.category === category);
    if (categoryQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
      setCurrentQuestion(categoryQuestions[randomIndex]);
      setQuestionTime(20);
    }
  };

  const answerQuestion = (selectedAnswer) => {
    if (currentQuestion && selectedAnswer === currentQuestion.answer) {
      setScore(prevScore => prevScore + 10);
    }
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    setCurrentQuestion(null);
    setSelectedCategory('');
    setQuestionTime(20);
  };

  const restartGame = () => {
    setCurrentScreen('start');
    setPlayerName('');
    setScore(0);
    setGameTime(300);
    setCurrentQuestion(null);
    setSelectedCategory('');
    setQuestionTime(20);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      {currentScreen === 'start' && (
        <StartScreen onStart={startGame} />
      )}
      
      {currentScreen === 'game' && (
        <GameScreen 
          playerName={playerName}
          score={score}
          gameTime={formatTime(gameTime)}
          questionTime={questionTime}
          categories={CATEGORIES}
          currentQuestion={currentQuestion}
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategory}
          onAnswerQuestion={answerQuestion}
        />
      )}
      
      {currentScreen === 'end' && (
        <EndScreen 
          score={score}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default App;
