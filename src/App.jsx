import React, { useState } from 'react';
import './App.css';
import TitleScreen from './components/TitleScreen';
import CheckupGame from './components/CheckupGame';
import XrayGame from './components/XrayGame';

function App() {
  const [gameState, setGameState] = useState('title'); // 'title', 'checkup', 'xray'
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setGameState('checkup');
  };

  const handleBackToTitle = () => {
    setGameState('title');
    setSelectedCharacter(null);
  };

  const handleStartXray = () => {
    setGameState('xray');
  };

  const handleBackToCheckup = () => {
    setGameState('checkup');
  };

  return (
    <div className="App">
      {gameState === 'title' && (
        <TitleScreen onSelectCharacter={handleCharacterSelect} />
      )}
      {gameState === 'checkup' && (
        <CheckupGame 
          selectedCharacter={selectedCharacter}
          onBack={handleBackToTitle}
          onStartXray={handleStartXray}
        />
      )}
      {gameState === 'xray' && (
        <XrayGame 
          selectedCharacter={selectedCharacter}
          onBack={handleBackToCheckup}
        />
      )}
      </div>
  );
}

export default App;