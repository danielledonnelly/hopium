import React, { useState, useRef } from 'react';
import './XrayGame.css';

const XrayGame = ({ selectedCharacter, onBack }) => {
  const [xrayPosition, setXrayPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const xrayRef = useRef(null);

  const handleMouseDown = (e) => {
    const rect = xrayRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
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
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getCharacterImages = () => {
    switch (selectedCharacter) {
      case 'flick':
        return {
          regular: '/assets/flick.png',
          xray: '/assets/flick-xray.png'
        };
      case 'muffy':
        return {
          regular: '/assets/muffy.png',
          xray: '/assets/muffy-xray.png'
        };
      case 'cap':
        return {
          regular: '/assets/cap.png',
          xray: '/assets/cap-xray.png'
        };
      default:
        return {
          regular: '/assets/flick.png',
          xray: '/assets/flick-xray.png'
        };
    }
  };

  const characterImages = getCharacterImages();

  return (
    <div 
      className="game-container"
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
          WebkitMaskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`
        }}
      />
      
      {/* Draggable X-ray */}
      <img 
        src="/assets/xray.png" 
        alt="X-ray" 
        className="xray-image"
        style={{
          left: xrayPosition.x,
          top: xrayPosition.y
        }}
        ref={xrayRef}
        onMouseDown={handleMouseDown}
        draggable={false}
      />
      
      {/* Return to Checkup Button */}
      <button 
        className="return-button"
        onClick={onBack}
      >
        ← Back to Checkup
      </button>
    </div>
  );
};

export default XrayGame; 