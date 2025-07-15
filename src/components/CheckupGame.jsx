import React from 'react';
import './CheckupGame.css';

const CheckupGame = ({ selectedCharacter, onBack, onStartXray }) => {
  const getCharacterImage = () => {
    switch (selectedCharacter) {
      case 'flick':
        return '/assets/flick.png';
      case 'muffy':
        return '/assets/muffy.png';
      case 'cap':
        return '/assets/cap.png';
      default:
        return '/assets/flick.png';
    }
  };

  return (
    <div className="checkup-game">
      <div className="checkup-background">
        <img 
          src={getCharacterImage()} 
          alt={selectedCharacter} 
          className="patient-image"
        />
        <div className="ui-controls">
          <button className="back-button" onClick={onBack}>
            ← Back to Title
          </button>
          <button className="xray-button" onClick={onStartXray}>
            Start X-Ray →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckupGame; 