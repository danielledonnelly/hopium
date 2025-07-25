import React, { useState, useRef } from 'react';
import './XrayGame.css';

// Diagnosis options and dialogues for Flick
const flickDiagnoses = [
  {
    name: 'Annoying',
    dialogue: [
      { speaker: 'Doc', text: "I diagnose you with annoying." },
      { speaker: 'Flick', text: "what." },
      { speaker: 'Doc', text: "You're right, your friends do hate you. You're annoying." },
      { speaker: 'Flick', text: "I…" },
      { speaker: 'Doc', text: "Haha nah I'm just fucking with you." },
      { speaker: 'Doc', text: "You have a worm in your brain and it likes to gaslight you." },
      { speaker: 'Flick', text: "I..." },
      { speaker: 'Flick', text: "I dunno if that's any better." },
      { speaker: 'Doc', text: "It is! We can't cure annoying." },
      { speaker: 'Doc', text: "But we CAN cure brain worms." },
      { speaker: 'Doc', text: "I'm gonna brew you up some Hopium!" },
    ]
  },
  {
    name: 'Brain Worms',
    dialogue: [
      { speaker: 'Doc', text: "I diagnose you with brain worms." },
      { speaker: 'Flick', text: "I..." },
      { speaker: 'Flick', text: "I dunno if that's any better." },
      { speaker: 'Doc', text: "It is! We can cure brain worms." },
      { speaker: 'Doc', text: "I'm gonna brew you up some Hopium!" },
    ]
  },
  {
    name: 'Coronary Heart Disease',
    dialogue: [
      { speaker: 'Doc', text: "I diagnose you with coronary heart disease." },
      { speaker: 'Flick', text: "Oh no..." },
      { speaker: 'Doc', text: "But don't worry! We can treat this with Hopium." },
      { speaker: 'Doc', text: "I'm gonna brew you up some Hopium!" },
    ]
  }
];

const getCharacterImages = (selectedCharacter) => {
  switch (selectedCharacter) {
    case 'flick':
      return {
        regular: '/assets/flick.png',
        xray: '/assets/flick-xray.png',
      };
    case 'muffy':
      return {
        regular: '/assets/muffy.png',
        xray: '/assets/muffy-xray.png',
      };
    case 'cap':
      return {
        regular: '/assets/cap.png',
        xray: '/assets/cap-xray.png',
      };
    default:
      return {
        regular: '/assets/flick.png',
        xray: '/assets/flick-xray.png',
      };
  }
};

const getCharacterName = (selectedCharacter) => {
  switch (selectedCharacter) {
    case 'flick':
      return 'Flick';
    case 'muffy':
      return 'Muffy';
    case 'cap':
      return 'Cap';
    default:
      return '';
  }
};

const XrayGame = ({ selectedCharacter, onBack }) => {
  const [xrayPosition, setXrayPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasXrayed, setHasXrayed] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [diagnosisDialogueIndex, setDiagnosisDialogueIndex] = useState(0);
  const [showPrepHopium, setShowPrepHopium] = useState(false);
  const xrayRef = useRef(null);

  const characterImages = getCharacterImages(selectedCharacter);

  // Patient position and size (should match .character-image in CSS)
  const patientRect = {
    x: window.innerWidth * 0.3 - 175, // left: 30%, width: 350px
    y: window.innerHeight * 0.4 - 0.5 * 350, // top: 40%, height: 350px
    width: 350,
    height: 350,
  };

  const handleMouseDown = (e) => {
    const rect = xrayRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    // Keep xray within bounds
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    setXrayPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
    // Check overlap with patient
    const xrayRect = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
      width: 250,
      height: 180, // mask size
    };
    if (
      xrayRect.x + xrayRect.width > patientRect.x &&
      xrayRect.x < patientRect.x + patientRect.width &&
      xrayRect.y + xrayRect.height > patientRect.y &&
      xrayRect.y < patientRect.y + patientRect.height
    ) {
      setHasXrayed(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDiagnose = () => {
    setShowDiagnosis(true);
  };

  const handleSelectDiagnosis = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setDiagnosisDialogueIndex(0);
  };

  const handleNextDiagnosisDialogue = () => {
    if (selectedDiagnosis) {
      if (diagnosisDialogueIndex < selectedDiagnosis.dialogue.length - 1) {
        setDiagnosisDialogueIndex(diagnosisDialogueIndex + 1);
      } else {
        setShowPrepHopium(true);
      }
    }
  };

  const handleBackToDiagnosis = () => {
    setShowPrepHopium(false);
    setSelectedDiagnosis(null);
    setDiagnosisDialogueIndex(0);
  };

  const handlePrepHopium = () => {
    // This could trigger a transition to a brewing/hopium preparation scene
    console.log('Prepping Hopium...');
  };

  const handleTextboxClick = (e) => {
    // Only handle clicks if we're not clicking on a button
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    if (showDiagnosis && selectedDiagnosis) {
      handleNextDiagnosisDialogue();
    }
  };

  return (
    <div className="game-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background */}
      <img
        src="/assets/background.png"
        alt="Background"
        className="background-image"
      />
      {/* Character - Regular version */}
      <img
        src={characterImages.regular}
        alt={selectedCharacter}
        className="character-image"
      />
      {/* Character - X-ray version with xray mask */}
      {!showDiagnosis && (
        <img
          src={characterImages.xray}
          alt={`${selectedCharacter} X-ray`}
          className="character-xray-image"
          style={{
            maskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`,
            WebkitMaskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`,
          }}
        />
      )}
      {/* Draggable X-ray */}
      {!showDiagnosis && (
        <img
          src="/assets/xray.png"
          alt="X-ray"
          className="xray-image"
          style={{
            left: xrayPosition.x,
            top: xrayPosition.y,
          }}
          ref={xrayRef}
          onMouseDown={handleMouseDown}
          draggable={false}
        />
      )}
      {/* Controls - match checkup stage */}
      <div className="ui-controls">
        <button className="back-button" onClick={onBack}>
          ← Back to Checkup
        </button>
        {hasXrayed && !showDiagnosis && (
          <button className="diagnose-button" onClick={handleDiagnose}>Diagnose</button>
        )}
        {showDiagnosis && selectedDiagnosis && showPrepHopium && selectedCharacter === 'flick' && (
          <>
            <button className="prep-hopium-button" onClick={handlePrepHopium}>
              Prep Hopium
            </button>
            <button className="back-diagnosis-button" onClick={handleBackToDiagnosis}>
              ← Back to Diagnosis
            </button>
          </>
        )}
      </div>
      {/* Diagnosis UI */}
      {showDiagnosis && (
        <div className="diagnosis-overlay">
          <div className="diagnosis-textbox" onClick={handleTextboxClick} style={{ cursor: 'pointer' }}>
            {/* Show diagnosis options */}
            {selectedDiagnosis === null && selectedCharacter === 'flick' && (
              <div className="diagnosis-options" onClick={(e) => e.stopPropagation()}>
                <div className="diagnosis-title">Choose a diagnosis for {getCharacterName(selectedCharacter)}:</div>
                {flickDiagnoses.map((diagnosis, idx) => (
                  <button
                    key={idx}
                    className="diagnosis-btn"
                    onClick={() => handleSelectDiagnosis(diagnosis)}
                  >
                    {diagnosis.name}
                  </button>
                ))}
              </div>
            )}
            {/* Show message for characters without diagnoses */}
            {selectedDiagnosis === null && selectedCharacter !== 'flick' && (
              <div className="diagnosis-options">
                <div className="diagnosis-title">Diagnosis not available for {getCharacterName(selectedCharacter)} yet.</div>
              </div>
            )}
            {/* Show diagnosis dialogue */}
            {selectedDiagnosis && selectedCharacter === 'flick' && (
              <div className="diagnosis-dialogue">
                {(() => {
                  const line = selectedDiagnosis.dialogue[diagnosisDialogueIndex];
                  return (
                    <div>
                      <span className="patient-name" style={{ color: 'var(--hopium-brown)' }}>
                        {line.speaker}:
                      </span>
                      <span className="patient-dialogue" style={{ color: 'var(--hopium-light-brown)' }}>
                        {line.text}
                      </span>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default XrayGame; 