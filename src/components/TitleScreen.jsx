import React, { useState, useEffect } from 'react';
import './TitleScreen.css';

const TitleScreen = ({ onSelectCharacter, flickDancingInTitle, muffyDancingInTitle, capDancingInTitle }) => {
  const [flickDanceFrame, setFlickDanceFrame] = useState(0);
  const [muffyDanceFrame, setMuffyDanceFrame] = useState(0);
  const [capDanceFrame, setCapDanceFrame] = useState(0);

  // Handle Flick's dance animation in title screen
  useEffect(() => {
    let danceInterval;
    if (flickDancingInTitle) {
      // Start at moderate speed and gradually speed up
      let currentDelay = 400; // Start at 400ms
      danceInterval = setInterval(() => {
        setFlickDanceFrame(prev => prev === 0 ? 1 : 0);
        // Gradually speed up
        currentDelay = Math.max(200, currentDelay - 20);
      }, currentDelay);
    }
    return () => {
      if (danceInterval) clearInterval(danceInterval);
    };
  }, [flickDancingInTitle]);

  // Handle Muffy's dance animation in title screen
  useEffect(() => {
    let danceInterval;
    if (muffyDancingInTitle) {
      // Start at moderate speed and gradually speed up
      let currentDelay = 400; // Start at 400ms
      danceInterval = setInterval(() => {
        setMuffyDanceFrame(prev => prev === 0 ? 1 : 0);
        // Gradually speed up
        currentDelay = Math.max(200, currentDelay - 20);
      }, currentDelay);
    }
    return () => {
      if (danceInterval) clearInterval(danceInterval);
    };
  }, [muffyDancingInTitle]);

  // Handle Cap's dance animation in title screen
  useEffect(() => {
    let danceInterval;
    if (capDancingInTitle) {
      // Start at moderate speed and gradually speed up
      let currentDelay = 400; // Start at 400ms
      danceInterval = setInterval(() => {
        setCapDanceFrame(prev => prev === 0 ? 1 : 0);
        // Gradually speed up
        currentDelay = Math.max(200, currentDelay - 20);
      }, currentDelay);
    }
    return () => {
      if (danceInterval) clearInterval(danceInterval);
    };
  }, [capDancingInTitle]);

  return (
    <div className="title-screen">
      <div className="character-selection">
        <div 
          className={`character flick ${flickDancingInTitle ? 'dancing' : ''}`}
          onClick={flickDancingInTitle ? undefined : () => onSelectCharacter('flick')}
          style={{ 
            cursor: flickDancingInTitle ? 'default' : 'pointer',
            backgroundImage: flickDancingInTitle 
              ? (flickDanceFrame === 0 ? 'url(/assets/flick-hope.png)' : 'url(/assets/flick-hope-switch.png)')
              : undefined
          }}
        />
        <div 
          className={`character muffy ${muffyDancingInTitle ? 'dancing' : ''}`}
          onClick={muffyDancingInTitle ? undefined : () => onSelectCharacter('muffy')}
          style={{ 
            cursor: muffyDancingInTitle ? 'default' : 'pointer',
            backgroundImage: muffyDancingInTitle 
              ? (muffyDanceFrame === 0 ? 'url(/assets/muffy-hope.png)' : 'url(/assets/muffy-hope-switch.png)')
              : undefined
          }}
        />
        <div 
          className={`character cap ${capDancingInTitle ? 'dancing' : ''}`}
          onClick={capDancingInTitle ? undefined : () => onSelectCharacter('cap')}
          style={{ 
            cursor: capDancingInTitle ? 'default' : 'pointer',
            backgroundImage: capDancingInTitle 
              ? (capDanceFrame === 0 ? 'url(/assets/cap-hope.png)' : 'url(/assets/cap-hope-switch.png)')
              : undefined
          }}
        />
      </div>
    </div>
  );
};

export default TitleScreen; 