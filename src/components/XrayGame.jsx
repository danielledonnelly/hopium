import React, { useState, useRef } from 'react';
import './XrayGame.css';

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

const XrayGame = ({ selectedCharacter, onBack }) => {
  const [xrayPosition, setXrayPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasXrayed, setHasXrayed] = useState(false);
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
      <img
        src={characterImages.xray}
        alt={`${selectedCharacter} X-ray`}
        className="character-xray-image"
        style={{
          maskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`,
          WebkitMaskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`,
        }}
      />
      {/* Draggable X-ray */}
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
      {/* Controls - match checkup stage */}
      <div className="ui-controls">
        <button className="back-button" onClick={onBack}>
          ← Back to Checkup
        </button>
        {hasXrayed && (
          <button className="diagnose-button">Diagnose</button>
        )}
      </div>
    </div>
  );
};

export default XrayGame; 