import React, { useState, useEffect } from 'react';
import './TitleScreen.css';

const TitleScreen = ({ onSelectCharacter, flickDancingInTitle, muffyDancingInTitle, capDancingInTitle, backgroundImage }) => {

  return (
    <div className="title-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="character-selection">
        <div 
          className={`character flick ${flickDancingInTitle ? 'dancing' : ''}`}
          onClick={flickDancingInTitle ? undefined : () => onSelectCharacter('flick')}
          style={{ 
            cursor: flickDancingInTitle ? 'default' : 'pointer',
            backgroundImage: flickDancingInTitle 
              ? 'url(/assets/flick-dance.gif)'
              : undefined
          }}
        />
        <div 
          className={`character muffy ${muffyDancingInTitle ? 'dancing' : ''}`}
          onClick={muffyDancingInTitle ? undefined : () => onSelectCharacter('muffy')}
          style={{ 
            cursor: muffyDancingInTitle ? 'default' : 'pointer',
            backgroundImage: muffyDancingInTitle 
              ? 'url(/assets/muffy-dance.gif)'
              : undefined
          }}
        />
        <div 
          className={`character cap ${capDancingInTitle ? 'dancing' : ''}`}
          onClick={capDancingInTitle ? undefined : () => onSelectCharacter('cap')}
          style={{ 
            cursor: capDancingInTitle ? 'default' : 'pointer',
            backgroundImage: capDancingInTitle 
              ? 'url(/assets/cap-dance.gif)'
              : undefined
          }}
        />
      </div>
    </div>
  );
};

export default TitleScreen; 