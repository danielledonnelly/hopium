import React, { useState } from 'react';
import './BrewHopium.css';

const INGREDIENTS = [
  // Bases
  { name: 'water', type: 'base', color: '#8ecae6' },
  { name: 'tea', type: 'base', color: '#b7b7a4' },
  { name: 'soup', type: 'base', color: '#f4a261' },
  // Additives
  { name: 'grass', type: 'additive', color: '#90be6d' },
  { name: 'berry', type: 'additive', color: '#e76f51' },
  { name: 'salt', type: 'additive', color: '#f1faee' },
  // Secrets
  { name: 'peace', type: 'secret', color: '#a3cef1' },
  { name: 'adventure', type: 'secret', color: '#ffb703' },
  { name: 'energy', type: 'secret', color: '#f72585' },
];

const STEP_ORDER = ['base', 'additive', 'secret'];

export default function BrewHopium({ onBrewed, onBack }) {
  const [selected, setSelected] = useState({ base: null, additive: null, secret: null });
  const [currentStep, setCurrentStep] = useState(0);
  const [dragged, setDragged] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleDragStart = (ingredient) => {
    setDragged(ingredient);
  };

  const handleDragEnd = () => {
    setDragged(null);
  };

  const handleDrop = () => {
    if (!dragged) return;
    const stepType = STEP_ORDER[currentStep];
    if (dragged.type === stepType) {
      setSelected((prev) => ({ ...prev, [stepType]: dragged }));
      setCurrentStep(currentStep + 1);
      setFeedback('');
    } else {
      setFeedback(`You need a ${stepType} ingredient!`);
    }
    setDragged(null);
  };

  const handleBrew = () => {
    if (onBrewed) onBrewed(selected);
  };

  const reset = () => {
    setSelected({ base: null, additive: null, secret: null });
    setCurrentStep(0);
    setFeedback('');
  };

  return (
    <div className="brew-hopium-container">
      <h2>Brew Hopium</h2>
      <div className="ingredient-grid">
        {INGREDIENTS.map((ing) => (
          <div
            key={ing.name}
            className={`ingredient-card ${dragged && dragged.name === ing.name ? 'dragging' : ''}`}
            style={{ background: ing.color, opacity: selected[ing.type]?.name === ing.name ? 0.3 : 1 }}
            draggable={currentStep === STEP_ORDER.indexOf(ing.type) && !selected[ing.type]}
            onDragStart={() => handleDragStart(ing)}
            onDragEnd={handleDragEnd}
          >
            {ing.name.charAt(0).toUpperCase() + ing.name.slice(1)}
            <div className="ingredient-type">{ing.type}</div>
          </div>
        ))}
      </div>
      <div
        className="beaker-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="beaker-img">🧪</div>
        <div className="beaker-label">
          {selected.base ? selected.base.name : 'Base'} + {selected.additive ? selected.additive.name : 'Additive'} + {selected.secret ? selected.secret.name : 'Secret'}
        </div>
      </div>
      {feedback && <div className="feedback-msg">{feedback}</div>}
      <div className="brew-controls">
        <button onClick={onBack}>Back</button>
        <button onClick={reset}>Reset</button>
        <button
          onClick={handleBrew}
          disabled={!(selected.base && selected.additive && selected.secret)}
        >
          Brew!
        </button>
      </div>
    </div>
  );
} 