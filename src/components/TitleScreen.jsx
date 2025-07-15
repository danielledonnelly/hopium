import React from 'react';
import './TitleScreen.css';

const TitleScreen = ({ onSelectCharacter }) => {
  return (
    <div className="title-screen">
      <div className="character-selection">
        <div 
          className="character flick"
          onClick={() => onSelectCharacter('flick')}
        />
        <div 
          className="character muffy"
          onClick={() => onSelectCharacter('muffy')}
        />
        <div 
          className="character cap"
          onClick={() => onSelectCharacter('cap')}
        />
      </div>
    </div>
  );
};

export default TitleScreen; 