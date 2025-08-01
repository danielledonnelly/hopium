import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TitleScreen from './components/TitleScreen';
import CheckupGame from './components/CheckupGame';
import XrayGame from './components/XrayGame';

function App() {
  const [gameState, setGameState] = useState('title'); // 'title', 'checkup', 'xray'
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [flickDancingInTitle, setFlickDancingInTitle] = useState(false);
  const [muffyDancingInTitle, setMuffyDancingInTitle] = useState(false);
  const [capDancingInTitle, setCapDancingInTitle] = useState(false);
  const [curedPatients, setCuredPatients] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/assets/Hopejam OST 2 - Joshua Murphy.wav');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Set volume to 20%
    // Auto-play music when component mounts
    const playMusic = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Auto-play prevented by browser. User must interact first.');
      }
    };
    playMusic();
  }, []);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setGameState('checkup');
  };

  const handleBackToTitle = () => {
    setGameState('title');
    setSelectedCharacter(null);
  };

  const handleBackToTitleWithDancingFlick = () => {
    setGameState('title');
    setSelectedCharacter(null);
    setFlickDancingInTitle(true);
  };

  const handleBackToTitleWithDancingMuffy = () => {
    setGameState('title');
    setSelectedCharacter(null);
    setMuffyDancingInTitle(true);
  };

  const handleBackToTitleWithDancingCap = () => {
    setGameState('title');
    setSelectedCharacter(null);
    setCapDancingInTitle(true);
  };

  const handlePatientCured = (patientName) => {
    if (!curedPatients.includes(patientName)) {
      setCuredPatients(prev => [...prev, patientName]);
    }
  };

  const getBackgroundImage = (isTitleScreen = false) => {
    const curedCount = curedPatients.length;
    const baseName = isTitleScreen ? 'hopium-hospital' : 'background';
    
    if (curedCount === 0) {
      return isTitleScreen ? '/assets/hopium-hospital.png' : '/assets/background.png';
    } else if (curedCount === 1) {
      return `/assets/${baseName}-bright.png`;
    } else if (curedCount === 2) {
      return `/assets/${baseName}-brighter.png`;
    } else {
      return `/assets/${baseName}-brightest.png`;
    }
  };

  const handleStartXray = () => {
    setGameState('xray');
  };

  const handleBackToCheckup = () => {
    setGameState('checkup');
  };

  // Called when brewing is finished
  const handleBrewed = () => {
    setGameState('title');
    setSelectedCharacter(null);
  };

  return (
    <div className="App">
      {gameState === 'title' && (
        <TitleScreen 
          onSelectCharacter={handleCharacterSelect} 
          flickDancingInTitle={flickDancingInTitle} 
          muffyDancingInTitle={muffyDancingInTitle} 
          capDancingInTitle={capDancingInTitle}
          backgroundImage={getBackgroundImage(true)}
        />
      )}
              {gameState === 'checkup' && (
          <CheckupGame 
            selectedCharacter={selectedCharacter}
            onBack={handleBackToTitle}
            onStartXray={handleStartXray}
            backgroundImage={getBackgroundImage(false)}
          />
        )}
      {gameState === 'xray' && (
        <XrayGame 
          selectedCharacter={selectedCharacter}
          onBack={handleBackToCheckup}
          onPrepHopium={handleBrewed}
          onBackToTitleWithDancingFlick={handleBackToTitleWithDancingFlick}
          onBackToTitleWithDancingMuffy={handleBackToTitleWithDancingMuffy}
          onBackToTitleWithDancingCap={handleBackToTitleWithDancingCap}
          backgroundImage={getBackgroundImage(false)}
          onPatientCured={handlePatientCured}
        />
      )}
    </div>
  );
}

export default App;