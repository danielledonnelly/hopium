import React, { useState } from 'react';
import './CheckupGame.css';

const flickDialogue = [
  { speaker: 'Flick', text: "Hiya, doc. I'm Flick. It's nice to meet you." },
  { speaker: 'Doc', text: 'What brings you into Hopium Hospital?' },
  { speaker: 'Flick', text: "I'm pretty sure all my friends hate me." },
  { speaker: 'Flick', text: "Also it feels like I'm having a heart attack, like all the time." },
  { speaker: 'Doc', text: 'Damn.' },
  { speaker: 'Doc', text: 'Let me ask a few questions.' },
];

const muffyDialogue = [
  { speaker: 'Doc', text: 'Hey there. How are you doing?' },
  { speaker: 'Muffy', text: 'hi' },
  { speaker: 'Muffy', text: "i'm good" },
  { speaker: 'Doc', text: 'Oh?' },
  { speaker: 'Muffy', text: "yeah my friend told me i need to get a checkup" },
  { speaker: 'Muffy', text: "but he's being so dramatic i'm literally fine lol" },
  { speaker: 'Doc', text: "I see… Let's do a quick consultation, just in case." },
  { speaker: 'Doc', text: "Then I'll give you a brain scan with my x-ray." },
  { speaker: 'Muffy', text: 'ok' },
];

const flickQuestions = [
  {
    question: 'What makes you think your friends hate you?',
    answer: [
      { speaker: 'Flick', text: "They're not very supportive of my rap career." },
      { speaker: 'Doc', text: 'They sound like good friends.' },
    ],
  },
  {
    question: 'Do you have any pre-existing health conditions?',
    answer: [
      { speaker: 'Flick', text: 'My blood pressure is kinda high.' },
    ],
  },
  {
    question: 'How have you been sleeping lately?',
    answer: [
      { speaker: 'Flick', text: "I don't sleep often, but I love when I do." },
      { speaker: 'Flick', text: "It stops the voices in my head." },
      { speaker: 'Doc', text: "Do you mean thoughts? Or literal voices?" },
      { speaker: 'Flick', text: "Is there a difference?" },
    ],
  },
];

const muffyQuestions = [
  {
    question: 'Why are your friends worried about you?',
    answer: [
      { speaker: 'Muffy', text: "they're being overdramatic" },
      { speaker: 'Doc', text: "Right, but about what?" },
      { speaker: 'Doc', text: "What's the problem?" },
      { speaker: 'Muffy', text: '…' },
      { speaker: 'Muffy', text: '…i can\'t tell you.' },
    ],
  },
  {
    question: 'Have you been eating well and exercising?',
    answer: [
      { speaker: 'Muffy', text: 'i mean yeah' },
      { speaker: 'Muffy', text: 'i like cooking and i\'m a great dancer' },
      { speaker: 'Doc', text: 'What kinds of food do you cook?' },
      { speaker: 'Muffy', text: 'cloud bread, frozen honey, hot girl salad' },
      { speaker: 'Doc', text: 'None of those foods involve cooking.' },
      { speaker: 'Doc', text: 'Also pretty sure you made those all up' },
      { speaker: 'Muffy', text: 'haha ok' },
    ],
  },
  {
    question: 'What are xome of your hobbies?',
    answer: [
      { speaker: 'Muffy', text: 'huh?' },
      { speaker: 'Doc', text: 'What do you do in your free time?' },
      { speaker: 'Muffy', text: 'uuuh hmm... photography. and dance, sometimes.' },
      { speaker: 'Muffy', text: 'i like movies, tv, video games. that kinda thing.' },
      { speaker: 'Muffy', text: 'porn is also cool i guess' },
    ],
  },
];

const getCharacterImage = (selectedCharacter) => {
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

const getCharacterDialogue = (selectedCharacter) => {
  switch (selectedCharacter) {
    case 'flick':
      return flickDialogue;
    case 'muffy':
      return muffyDialogue;
    default:
      return [];
  }
};

const getCharacterQuestions = (selectedCharacter) => {
  switch (selectedCharacter) {
    case 'flick':
      return flickQuestions;
    case 'muffy':
      return muffyQuestions;
    default:
      return [];
  }
};

const CheckupGame = ({ selectedCharacter, onBack, onStartXray }) => {
  const [showTextbox, setShowTextbox] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [currentQA, setCurrentQA] = useState(null);
  const [qaLineIndex, setQaLineIndex] = useState(0);

  const handleInterview = () => {
    setShowTextbox(true);
    setDialogueIndex(0);
    setShowQuestions(false);
    setAskedQuestions([]);
    setCurrentQA(null);
    setQaLineIndex(0);
  };

  const handleNextDialogue = () => {
    const characterDialogue = getCharacterDialogue(selectedCharacter);
    if (dialogueIndex < characterDialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setShowQuestions(true);
    }
  };

  const handleAskQuestion = (idx) => {
    setCurrentQA(idx);
    setAskedQuestions([...askedQuestions, idx]);
    setQaLineIndex(0);
  };

  const handleNextQA = () => {
    if (currentQA !== null) {
      const characterQuestions = getCharacterQuestions(selectedCharacter);
      const answerLines = characterQuestions[currentQA].answer;
      if (qaLineIndex < answerLines.length - 1) {
        setQaLineIndex(qaLineIndex + 1);
      } else {
        setCurrentQA(null);
        setQaLineIndex(0);
      }
    }
  };

  // Handler for clicking the dialogue bar
  const handleTextboxClick = () => {
    const characterDialogue = getCharacterDialogue(selectedCharacter);
    if (characterDialogue.length > 0 && !showQuestions) {
      if (dialogueIndex < characterDialogue.length - 1) {
        handleNextDialogue();
      } else {
        setShowQuestions(true);
      }
    } else if (showQuestions && currentQA !== null) {
      handleNextQA();
    }
  };

  const characterDialogue = getCharacterDialogue(selectedCharacter);
  const characterQuestions = getCharacterQuestions(selectedCharacter);
  const hasDialogue = characterDialogue.length > 0;

  return (
    <div className="checkup-game">
      <div className="checkup-background">
        <img 
          src={getCharacterImage(selectedCharacter)} 
          alt={selectedCharacter} 
          className="patient-image"
        />
        <div className="ui-controls">
          <button className="back-button" onClick={onBack}>
            ← Back to Title
          </button>
          <button className="interview-button" onClick={handleInterview}>
            Interview Patient
          </button>
          <button className="xray-button" onClick={onStartXray}>
            Start X-Ray →
          </button>
        </div>
        {showTextbox && (
          <div className="patient-textbox" onClick={handleTextboxClick} style={{ cursor: 'pointer' }}>
            {/* Dialogue sequence */}
            {hasDialogue && !showQuestions && (
              <>
                <span className="patient-name" style={{ color: 'var(--hopium-brown)' }}>
                  {characterDialogue[dialogueIndex].speaker}:
                </span>
                <span className="patient-dialogue" style={{ color: 'var(--hopium-light-brown)' }}>
                  {characterDialogue[dialogueIndex].text}
                </span>
              </>
            )}
            {/* Show questions after intro dialogue */}
            {hasDialogue && showQuestions && currentQA === null && (
              <div className="question-list">
                <div className="question-title">Ask {getCharacterName(selectedCharacter)} a question:</div>
                {characterQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="question-btn"
                    onClick={() => handleAskQuestion(idx)}
                    disabled={askedQuestions.includes(idx)}
                  >
                    {q.question}
                  </button>
                ))}
                {askedQuestions.length === characterQuestions.length && (
                  <div className="all-asked">That's everything. Start the scan.</div>
                )}
              </div>
            )}
            {/* Show Q&A for selected question */}
            {hasDialogue && showQuestions && currentQA !== null && (
              <div className="qa-block">
                {(() => {
                  const line = characterQuestions[currentQA].answer[qaLineIndex];
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
        )}
      </div>
    </div>
  );
};

export default CheckupGame; 