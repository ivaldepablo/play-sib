import React, { useState } from 'react';
import './SpinWheel.css';

// Iconos para cada categoría
const CATEGORY_ICONS = {
  "Жизнь социальных классов": "🏛️",
  "Домашнее хозяйство": "🏠", 
  "Знаменитые купеческие династии": "👑",
  "Томск - крупный сибирский торговый центр": "🏪",
  "Развитие предпринимательства": "💼"
};

// Colores para cada segmento
const CATEGORY_COLORS = [
  "#FF6B6B", // Rojo coral
  "#4ECDC4", // Turquesa
  "#45B7D1", // Azul cielo
  "#96CEB4", // Verde menta
  "#FFEAA7", // Amarillo suave
];

const SpinWheel = ({ categories, onSpin, isSpinning }) => {
  const [rotation, setRotation] = useState(0);
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    // Reproducir sonido de giro
    playSpinSound();
    
    // Generar rotación aleatoria (mínimo 5 vueltas)
    const spins = 5 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = spins * 360 + randomAngle;
    
    setRotation(prevRotation => prevRotation + totalRotation);
    
    // Determinar qué categoría resultó seleccionada
    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentAngle = 360 / categories.length;
      const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
      const selectedCategory = categories[selectedIndex];
      
      playWinSound();
      onSpin(selectedCategory);
    }, 2000);
  };

  const playSpinSound = () => {
    try {
      // Sonido de giro de rueda
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {}
  };

  const playWinSound = () => {
    try {
      // Sonido de resultado
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwfAzGH0fPTgjMGHm7A7+OZURED');
      audio.play();
    } catch (e) {}
  };

  const segmentAngle = 360 / categories.length;

  return (
    <div className="spin-wheel-container">
      <div className="wheel-wrapper">
        {/* Indicador/flecha */}
        <div className="wheel-pointer">▼</div>
        
        {/* Rueda */}
        <div 
          className={`wheel ${isSpinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {categories.map((category, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const midAngle = (startAngle + endAngle) / 2;
            
            return (
              <div
                key={category}
                className="wheel-segment"
                style={{
                  '--start-angle': `${startAngle}deg`,
                  '--end-angle': `${endAngle}deg`,
                  '--bg-color': CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                  transform: `rotate(${startAngle}deg)`,
                }}
              >
                <div 
                  className="segment-content"
                  style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                >
                  <div className="segment-icon">
                    {CATEGORY_ICONS[category]}
                  </div>
                  <div className="segment-text">
                    {category.split(' ').slice(0, 2).join(' ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Centro de la rueda */}
        <div className="wheel-center">
          <button 
            className={`spin-button ${isSpinning ? 'spinning' : ''}`}
            onClick={handleSpin}
            disabled={isSpinning}
          >
            {isSpinning ? '🌀' : '🎯'}
          </button>
        </div>
      </div>
      
      <div className="spin-instruction">
        {isSpinning ? (
          <p className="spinning-text">Крутится... 🌀</p>
        ) : (
          <p>Нажмите на центр, чтобы крутить колесо!</p>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
