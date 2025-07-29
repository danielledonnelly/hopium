import React, { useState, useRef, useEffect } from 'react';
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
      { speaker: 'Doc', text: "You have a brain worm." },
      { speaker: 'Doc', text: "It's telling you lies. Making you anxious." },
      { speaker: 'Flick', text: "Oh." },
      { speaker: 'Flick', text: "What do we do?" },
      { speaker: 'Doc', text: "I'm gonna make you some hopium." },
    ]
  },
  {
    name: 'Coronary Heart Disease',
    dialogue: [
      { speaker: 'Doc', text: "You've got Coronary Heart Disease." },
      { speaker: 'Doc', text: "You have two weeks to live." },
      { speaker: 'Flick', text: "what." },
      { speaker: 'Doc', text: "Haha nah I'm just fucking with you." },
      { speaker: 'Doc', text: "You have a worm in your brain." },
      { speaker: 'Flick', text: "I dunno if that's any better." },
      { speaker: 'Doc', text: "It is! Hopium can cure brain worms." },
      { speaker: 'Doc', text: "I'm gonna make some now!" },
    ]
  }
];

const muffyDiagnoses = [
  {
    name: 'Gay',
    dialogue: [
      { speaker: 'Doc', text: "I diagnose you with gay." },
      { speaker: 'Muffy', text: "i'm not gay" },
      { speaker: 'Doc', text: "yes you are." },
      { speaker: 'Muffy', text: "i like men" },
      { speaker: 'Doc', text: "Yeah that's gay." },
      { speaker: 'Muffy', text: "i'm a woman" },
      { speaker: 'Doc', text: "Are you sure?" },
      { speaker: 'Muffy', text: "omfg yes" },
      { speaker: 'Muffy', text: "also being gay isn't a disease" },
      { speaker: 'Muffy', text: "diagnose me again" },
      { speaker: 'Muffy', text: "and don't be silly this time" },
    ]
  },
  {
    name: 'Brainrot',
    dialogue: [
      { speaker: 'Doc', text: "You have brainrot." },
      { speaker: 'Doc', text: "Too much time online has rotted your mind." },
      { speaker: 'Doc', text: "You go through life sedated, barely conscious." },
      { speaker: 'Doc', text: "Because consuming media online is all you do all day." },
      { speaker: 'Muffy', text: "🆗" },
      { speaker: 'Doc', text: "You need to get off your phone." },
      { speaker: 'Muffy', text: "can't" },
      { speaker: 'Muffy', text: "this is all i have" },
      { speaker: 'Muffy', text: "checking my phone has become a compulsion for me" },
      { speaker: 'Muffy', text: "it's soothing and comforting. even when it makes me sad" },
      { speaker: 'Doc', text: "That makes no sense." },
      { speaker: 'Muffy', text: "haha yeah i know, it sucks" },
      { speaker: 'Doc', text: "I think I can help." },
    ]
  },
  {
    name: 'Chronically Online',
    dialogue: [
      { speaker: 'Doc', text: "You're chronically online and out of touch with reality." },
      { speaker: 'Doc', text: "You spend way too much time doomscrolling social media." },
      { speaker: 'Doc', text: "It has poisoned your mind with a detached doomer mentality." },
      { speaker: 'Muffy', text: "it do be like that" },
      { speaker: 'Doc', text: "The good news is, it's only chronic. Not terminal." },
      { speaker: 'Muffy', text: "oh. does that mean there's still hope?" },
      { speaker: 'Doc', text: "There's always still hope." },
    ]
  }
];

const capDiagnoses = [
  {
    name: 'Void',
    dialogue: [
      { speaker: 'Doc', text: "You are void mode." },
      { speaker: 'Cap', text: "What does that mean?" },
      { speaker: 'Doc', text: "You're emotionally numb." },
      { speaker: 'Doc', text: "You've disconnected from yourself and others." },
      { speaker: 'Doc', text: "You just feel empty and helpless." },
      { speaker: 'Doc', text: "That's void mode." },
      { speaker: 'Cap', text: "Okay. How do I switch modes?" },
      { speaker: 'Doc', text: "Some hopium should help with that." },
    ]
  },
  {
    name: 'Migraines',
    dialogue: [
      { speaker: 'Doc', text: "You have chronic pain." },
      { speaker: 'Doc', text: "Migraines, to be specific." },
      { speaker: 'Cap', text: "That doesn't seem right." },
      { speaker: 'Doc', text: "Aren't you in pain?" },
      { speaker: 'Cap', text: "I think my brain is causing me pain." },
      { speaker: 'Cap', text: "But I don't feel the pain in my brain." },
      { speaker: 'Cap', text: "My head doesn't hurt, it just..." },
      { speaker: 'Cap', text: "Makes everything else hurt." },
      { speaker: 'Cap', text: "Does that make sense?" },
      { speaker: 'Doc', text: "No" },
      { speaker: 'Doc', text: "But let me think." },
      { speaker: 'Doc', text: "Maybe hopium can help with you out." },
    ]
  },
  {
    name: 'Depression',
    dialogue: [
      { speaker: 'Doc', text: "You have depression." },
      { speaker: 'Cap', text: "Just depression?" },
      { speaker: 'Cap', text: "You diagnosed the first chick with brain worms..." },
      { speaker: 'Cap', text: "And then told the second one to just get off her phone." },
      { speaker: 'Cap', text: "And now they've having a whimsical dance party." },
      { speaker: 'Cap', text: "But me, I just have depression? That's it?" },
      { speaker: 'Cap', text: "No silly name or diagnosis for it?" },
      { speaker: 'Doc', text: "Sorry, man." },
    ]
  }
];

// Brewing ingredients
const BREWING_INGREDIENTS = {
  base: [
    { name: 'water', image: '/assets/water.png' },
    { name: 'tea', image: '/assets/tea.png' },
    { name: 'soup', image: '/assets/soup.png' }
  ],
  additive: [
    { name: 'grass', image: '/assets/grass.png' },
    { name: 'berry', image: '/assets/berry.png' },
    { name: 'salt', image: '/assets/salt.png' }
  ],
  secret: [
    { name: 'energy', image: '/assets/energy.png' },
    { name: 'peace', image: '/assets/peace.png' },
    { name: 'passion', image: '/assets/passion.png' }
  ]
};

const BREWING_DIALOGUE = [
  { speaker: 'Doc', text: "First I'll pick a base to add to the vial." },
  { speaker: 'Doc', text: "Now for an additive..." },
  { speaker: 'Doc', text: "And lastly, the secret ingredient." }
];

const hopiumSuccessDialogue = [
  { speaker: 'Doc', text: 'Here you go, Flick. Take this hopium.' },
  { speaker: 'Flick', text: 'Lemme take a sip... Hmm...' },
  { speaker: 'Flick', text: 'I don\'t feel any different.' },
  { speaker: 'Doc', text: 'Well yeah, that\'s natural.' },
  { speaker: 'Doc', text: 'Mental health is complicated and messy, y\'know.' },
  { speaker: 'Doc', text: 'It takes more than a sip of some miracle drug to-' },
  { speaker: 'Flick', text: 'Wait! It\'s working!' },
  { speaker: 'Flick', text: 'The mean voice in my head, it\'s gone!' },
  { speaker: 'Doc', text: 'Oh.' },
  { speaker: 'Doc', text: 'Cool.' },
  { speaker: 'Flick', text: 'I still feel some nervous energy... but I can handle it now!' },
  { speaker: 'Flick', text: 'Thank you Doc, you\'re the best!' },
  { speaker: 'Doc', text: 'No problem. Happy to help.' },
  { speaker: 'Doc', text: 'Guess I should see my next patient.' },
];

const muffyHopiumSuccessDialogue = [
  { speaker: 'Doc', text: 'Put your phone down for a sec and drink this.' },
  { speaker: 'Doc', text: 'It should help with the addiction.' },
  { speaker: 'Muffy', text: '😮' },
  { speaker: 'Muffy', text: 'this shit good' },
  { speaker: 'Muffy', text: 'Wait... I feel different.' },
  { speaker: 'Doc', text: 'You sound different.' },
  { speaker: 'Muffy', text: 'Oh.' },
  { speaker: 'Muffy', text: 'I just realized.' },
  { speaker: 'Muffy', text: 'All the stuff I seethe about online is stupid.' },
  { speaker: 'Muffy', text: 'I can just log off and disengage.' },
  { speaker: 'Doc', text: 'Yeah, you can.' },
  { speaker: 'Muffy', text: 'I\'m gonna do that!' },
  { speaker: 'Muffy', text: 'I\'m gonna do a little dance.' },
  { speaker: 'Muffy', text: 'And then I\'m gonna touch a little grass.' },
  { speaker: 'Doc', text: 'Good for you.' },
  { speaker: 'Muffy', text: 'Thanks Doc! You\'re a real one.' },
  { speaker: 'Doc', text: 'I guess I should go and check on the next patient.' },
];

const capHopiumSuccessDialogue = [
  { speaker: 'Doc', text: 'Here you go, enjoy.' },
  { speaker: 'Cap', text: 'Mmm.' },
  { speaker: 'Cap', text: 'Hmm.' },
  { speaker: 'Doc', text: 'How do you feel?' },
  { speaker: 'Cap', text: 'I do. Feel, I mean.' },
  { speaker: 'Cap', text: 'I don\'t know what I feel exactly.' },
  { speaker: 'Cap', text: 'But I feel something.' },
  { speaker: 'Cap', text: 'I\'m not all numb anymore.' },
  { speaker: 'Doc', text: 'I\'m glad.' },
  { speaker: 'Cap', text: 'Thanks, Doc.' },
  { speaker: 'Cap', text: 'I appreciate it.' },
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
        phone: '/assets/muffy-phone.png',
        switch: '/assets/muffy-switch.png',
        hopeSwitch: '/assets/muffy-hope-switch.png',
      };
    case 'cap':
      return {
        regular: '/assets/cap.png',
        xray: '/assets/cap-xray.png',
        switch: '/assets/cap-switch.png',
        hope: '/assets/cap-hope.png',
        hopeSwitch: '/assets/cap-hope-switch.png',
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

const XrayGame = ({ selectedCharacter, onBack, onPrepHopium, onBackToTitleWithDancingFlick, onBackToTitleWithDancingMuffy, onBackToTitleWithDancingCap, backgroundImage, onPatientCured }) => {
  const [xrayPosition, setXrayPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasXrayed, setHasXrayed] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [diagnosisDialogueIndex, setDiagnosisDialogueIndex] = useState(0);
  const [showPrepHopium, setShowPrepHopium] = useState(false);
  
  // Brewing state
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewingStep, setBrewingStep] = useState(0);
  const [brewingIngredients, setBrewingIngredients] = useState({ base: null, additive: null, secret: null });
  const [draggedIngredient, setDraggedIngredient] = useState(null);
  const [brewingResult, setBrewingResult] = useState(null);
  const [showBrewingResult, setShowBrewingResult] = useState(false);
  const [copiumDialogueIndex, setCopiumDialogueIndex] = useState(0);
  const [copiumReason, setCopiumReason] = useState(null);
  const [showHopiumSuccessDialogue, setShowHopiumSuccessDialogue] = useState(false);
  const [hopiumDialogueIndex, setHopiumDialogueIndex] = useState(0);
  const [showMuffyHopiumSuccessDialogue, setShowMuffyHopiumSuccessDialogue] = useState(false);
  const [muffyHopiumDialogueIndex, setMuffyHopiumDialogueIndex] = useState(0);
  const [showCapHopiumSuccessDialogue, setShowCapHopiumSuccessDialogue] = useState(false);
  const [capHopiumDialogueIndex, setCapHopiumDialogueIndex] = useState(0);
  const [brewingComplete, setBrewingComplete] = useState(false);
  const [flickDancing, setFlickDancing] = useState(false);
  const [danceFrame, setDanceFrame] = useState(0);
  const [flickFlickering, setFlickFlickering] = useState(false);
  const [flickerFrame, setFlickerFrame] = useState(0);
  const [askedDiagnoses, setAskedDiagnoses] = useState([]);
  
  const xrayRef = useRef(null);

  // Handle Flick's dance animation
  useEffect(() => {
    let danceInterval;
    if (flickDancing) {
      // Start at moderate speed and gradually speed up
      let currentDelay = 400; // Start at 400ms
      danceInterval = setInterval(() => {
        setDanceFrame(prev => prev === 0 ? 1 : 0);
        // Gradually speed up
        currentDelay = Math.max(200, currentDelay - 20);
      }, currentDelay);
    }
    return () => {
      if (danceInterval) clearInterval(danceInterval);
    };
  }, [flickDancing]);

  // Handle Flick's flickering animation
  useEffect(() => {
    let flickerInterval;
    if (flickFlickering) {
      flickerInterval = setInterval(() => {
        setFlickerFrame(prev => prev === 0 ? 1 : 0);
      }, 300); // Switch every 300ms
    }
    return () => {
      if (flickerInterval) clearInterval(flickerInterval);
    };
  }, [flickFlickering]);

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
        
        // Check for specific dialogue lines that should show the prep hopium button
        const currentLine = selectedDiagnosis.dialogue[diagnosisDialogueIndex + 1];
        if (selectedCharacter === 'muffy' && currentLine && 
            (currentLine.text === "I think I can help." || currentLine.text === "There's always still hope.")) {
          setShowPrepHopium(true);
        } else if (selectedCharacter === 'cap' && currentLine && 
            (currentLine.text === "Some hopium should help with that." || 
             currentLine.text === "Maybe hopium can help." ||
             currentLine.text === "Sorry, man.")) {
          setShowPrepHopium(true);
        }
      } else {
        // Special handling for Muffy's "Gay" diagnosis
        if (selectedCharacter === 'muffy' && selectedDiagnosis.name === 'Gay') {
          setAskedDiagnoses(prev => [...prev, selectedDiagnosis.name]);
          setSelectedDiagnosis(null);
          setDiagnosisDialogueIndex(0);
          // Don't show prep hopium, go back to diagnosis selection
        } else {
          setShowPrepHopium(true);
        }
      }
    }
  };

  const handleBackToDiagnosis = () => {
    setShowPrepHopium(false);
    setSelectedDiagnosis(null);
    setDiagnosisDialogueIndex(0);
  };

  const handlePrepHopium = () => {
    setIsBrewing(true);
    setBrewingStep(0);
    setBrewingIngredients({ base: null, additive: null, secret: null });
  };

  const handleTextboxClick = (e) => {
    // Only handle clicks if we're not clicking on a button
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    if (showDiagnosis && selectedDiagnosis && !isBrewing) {
      handleNextDiagnosisDialogue();
    }
    if (showHopiumSuccessDialogue) {
      if (hopiumDialogueIndex < hopiumSuccessDialogue.length - 1) {
        setHopiumDialogueIndex(hopiumDialogueIndex + 1);
        
        // Trigger character changes at specific dialogue points
        if (hopiumDialogueIndex === 3) { // When "Mental health is complicated and messy, y'know" appears
          // Character will change to flick-switch.png in the render
        } else if (hopiumDialogueIndex === 4) { // When "It takes more than a sip of some miracle drug to-" appears
          onPatientCured('flick'); // Mark Flick as cured - background changes here
        } else if (hopiumDialogueIndex === 5) { // When "Wait! It's working!" appears
          // Character will change to flick-hope.png
        } else if (hopiumDialogueIndex === 6) { // When "The mean voice in my head, it's gone!" appears
          // Character will change to flick-switch.png
        } else if (hopiumDialogueIndex === 7) { // When "Oh." appears
          setFlickFlickering(false);
          setFlickDancing(true); // Start the dance animation
        }
      } else {
        // End the hopium sequence and return to title screen
        setShowHopiumSuccessDialogue(false);
        setHopiumDialogueIndex(0);
        setFlickDancing(false);
        setDanceFrame(0);
        setFlickFlickering(false);
        setFlickerFrame(0);
        // Return to title screen with Flick in dancing state
        onBackToTitleWithDancingFlick();
      }
    }
    
    if (showMuffyHopiumSuccessDialogue) {
      if (muffyHopiumDialogueIndex < muffyHopiumSuccessDialogue.length - 1) {
        setMuffyHopiumDialogueIndex(muffyHopiumDialogueIndex + 1);
        
        // Mark Muffy as cured when she reaches her hope state
        if (muffyHopiumDialogueIndex === 5) { // When she says "Oh."
          onPatientCured('muffy');
        }
      } else {
        // End the hopium sequence and return to title screen with Muffy dancing
        setShowMuffyHopiumSuccessDialogue(false);
        setMuffyHopiumDialogueIndex(0);
        // Return to title screen with Muffy in dancing state
        onBackToTitleWithDancingMuffy();
      }
    }
    
    if (showCapHopiumSuccessDialogue) {
      if (capHopiumDialogueIndex < capHopiumSuccessDialogue.length - 1) {
        setCapHopiumDialogueIndex(capHopiumDialogueIndex + 1);
        
        // Mark Cap as cured when he reaches his hope state
        if (capHopiumDialogueIndex === 4) { // When he says "I do. Feel, I mean."
          onPatientCured('cap');
        }
      } else {
        // End the hopium sequence and return to title screen with Cap dancing
        setShowCapHopiumSuccessDialogue(false);
        setCapHopiumDialogueIndex(0);
        // Return to title screen with Cap in dancing state
        onBackToTitleWithDancingCap();
      }
    }
  };

  // Brewing ingredient drag handlers
  const handleIngredientDragStart = (ingredient) => {
    setDraggedIngredient(ingredient);
  };

  const handleIngredientDragEnd = () => {
    setDraggedIngredient(null);
  };

  const handleBeakerDrop = (e) => {
    e.preventDefault();
    if (!draggedIngredient) return;
    
    const stepTypes = ['base', 'additive', 'secret'];
    const currentStepType = stepTypes[brewingStep];
    
    setBrewingIngredients(prev => ({
      ...prev,
      [currentStepType]: draggedIngredient
    }));
    
    setBrewingStep(brewingStep + 1);
    setDraggedIngredient(null);
    
    // If all ingredients are added, immediately show result
    if (brewingStep === 2) {
      const finalIngredients = {
        base: brewingIngredients.base,
        additive: brewingIngredients.additive,
        secret: draggedIngredient
      };
      
      let resultImage = '/assets/hopium.png'; // Default to hopium
      let isCopium = false;
      let reason = null;
      
      // Special rules for Flick
      if (selectedCharacter === 'flick') {
        const hasSalt = finalIngredients.additive?.name === 'salt';
        const hasTea = finalIngredients.base?.name === 'tea';
        const hasEnergy = finalIngredients.secret?.name === 'energy';
        
        // Copium conditions: missing salt/tea OR has energy
        if (!hasSalt || !hasTea || hasEnergy) {
          resultImage = '/assets/copium.png';
          isCopium = true;
          
          if (!hasTea) {
            reason = 'no-tea';
          } else if (!hasSalt) {
            reason = 'no-salt';
          } else if (hasEnergy) {
            reason = 'has-energy';
          }
        }
      }
      
      // Special rules for Muffy
      if (selectedCharacter === 'muffy') {
        const hasGrass = finalIngredients.additive?.name === 'grass';
        const hasEnergy = finalIngredients.secret?.name === 'energy';
        
        // Copium conditions: missing grass OR has energy
        if (!hasGrass || hasEnergy) {
          resultImage = '/assets/copium.png';
          isCopium = true;
          
          if (!hasGrass) {
            reason = 'no-grass';
          } else if (hasEnergy) {
            reason = 'has-energy';
          }
        }
      }
      
      setBrewingResult(resultImage);
      setShowBrewingResult(true);
      setCopiumReason(reason);
      setCopiumDialogueIndex(0);
    }
  };

  const getCurrentIngredients = () => {
    const stepTypes = ['base', 'additive', 'secret'];
    const currentStepType = stepTypes[brewingStep];
    return BREWING_INGREDIENTS[currentStepType] || [];
  };

  const handleCopiumDialogueClick = () => {
    const maxDialogueIndex = copiumReason === 'no-salt' ? 4 : 3; // 5 dialogues for no-salt, 4 for others
    
    if (copiumDialogueIndex < maxDialogueIndex) {
      setCopiumDialogueIndex(copiumDialogueIndex + 1);
    } else {
      // Restart brewing
      setShowBrewingResult(false);
      setBrewingResult(null);
      setCopiumReason(null);
      setCopiumDialogueIndex(0);
      setBrewingStep(0);
      setBrewingIngredients({ base: null, additive: null, secret: null });
    }
  };

  const handleHopiumSuccessClick = () => {
    setShowBrewingResult(false);
    setBrewingResult(null);
    if (selectedCharacter === 'flick') {
      setShowHopiumSuccessDialogue(true);
    } else if (selectedCharacter === 'muffy') {
      setShowMuffyHopiumSuccessDialogue(true);
    } else if (selectedCharacter === 'cap') {
      setShowCapHopiumSuccessDialogue(true);
    }
    setIsBrewing(false); // Stop the brewing phase completely
    setShowDiagnosis(false); // Hide the diagnosis overlay
    setBrewingComplete(true); // Mark brewing as complete
  };

  const getCopiumDialogue = () => {
    if (copiumDialogueIndex === 0) {
      return "This isn't hopium... it's copium.";
    } else if (copiumDialogueIndex === 1) {
      if (selectedCharacter === 'flick') {
        if (copiumReason === 'no-tea') {
          return "Flick needs a sweet and calming herbal base.";
        } else if (copiumReason === 'no-salt') {
          return "Next time I should add some salt.";
        } else if (copiumReason === 'has-energy') {
          return "I'll skip the energy this time around.";
        }
      } else if (selectedCharacter === 'muffy') {
        if (copiumReason === 'no-grass') {
          return "Muffy's hopium mix has to bring her back to reality.";
        } else if (copiumReason === 'has-energy') {
          return "I'll skip the energy this time around.";
        }
      }
    } else if (copiumDialogueIndex === 2) {
      if (selectedCharacter === 'flick' && copiumReason === 'no-salt') {
        return "That'll get rid of the brain worm.";
      } else if (selectedCharacter === 'muffy' && copiumReason === 'no-grass') {
        return "I need to help her touch grass.";
      } else {
        return "Let's try this again.";
      }
    } else if (copiumDialogueIndex === 3) {
      if ((selectedCharacter === 'flick' && copiumReason === 'no-salt') || 
          (selectedCharacter === 'muffy' && copiumReason === 'no-grass')) {
        return "Let's try this again.";
      }
    }
    return "Let's try this again.";
  };

  return (
    <div className="game-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background */}
      <img
        src={backgroundImage}
        alt="Background"
        className="background-image"
      />
      {/* Character - Regular version */}
      <img
        src={
          selectedCharacter === 'flick' && showHopiumSuccessDialogue && hopiumDialogueIndex >= 3
            ? hopiumDialogueIndex === 3
              ? '/assets/flick-switch.png'
              : hopiumDialogueIndex === 4
                ? '/assets/flick.png'
                : hopiumDialogueIndex >= 5
                  ? flickDancing
                    ? '/assets/flick-dance.gif'
                    : (hopiumDialogueIndex % 2 === 0 ? '/assets/flick-hope.png' : '/assets/flick-hope-switch.png')
                  : '/assets/flick-hope.png'
            : selectedCharacter === 'muffy' && showMuffyHopiumSuccessDialogue && muffyHopiumDialogueIndex >= 3
              ? muffyHopiumDialogueIndex === 3
                ? '/assets/muffy-switch.png'
                : muffyHopiumDialogueIndex === 4
                  ? '/assets/muffy.png'
                  : muffyHopiumDialogueIndex === 5
                    ? '/assets/muffy-switch.png'
                    : muffyHopiumDialogueIndex === 6
                      ? '/assets/muffy-hope.png'
                      : muffyHopiumDialogueIndex === 7
                        ? '/assets/muffy-hope-switch.png'
                        : muffyHopiumDialogueIndex >= 8
                          ? '/assets/muffy-dance.gif'
                          : '/assets/muffy-hope-switch.png'
              : selectedCharacter === 'cap' && showCapHopiumSuccessDialogue && capHopiumDialogueIndex >= 2
                ? capHopiumDialogueIndex === 2
                  ? '/assets/cap-switch.png'
                  : capHopiumDialogueIndex === 3
                    ? '/assets/cap.png'
                    : capHopiumDialogueIndex === 4
                      ? '/assets/cap-hope.png'
                      : capHopiumDialogueIndex === 5
                        ? '/assets/cap-hope-switch.png'
                        : capHopiumDialogueIndex === 6
                          ? '/assets/cap-hope.png'
                          : capHopiumDialogueIndex === 7
                            ? '/assets/cap-hope-switch.png'
                                                    : capHopiumDialogueIndex >= 8
                          ? '/assets/cap-dance.gif'
                          : '/assets/cap-hope-switch.png'
              : selectedCharacter === 'muffy' && showDiagnosis
                ? characterImages.phone
                : characterImages.regular
        }
        alt={selectedCharacter}
        className="character-image"
      />
      {/* Brewing overlay for darkening background and character during brewing phase */}
      {isBrewing && <div className="brewing-overlay"></div>}
      {/* Character - X-ray version with xray mask */}
      {!showDiagnosis && !brewingComplete && (
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
      {!showDiagnosis && !brewingComplete && (
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
      
      {/* Brewing ingredients */}
      {isBrewing && (
        <div className="brewing-ingredients">
          {getCurrentIngredients().map((ingredient) => (
            <div key={ingredient.name} className="ingredient-container">
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="brewing-ingredient"
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', ingredient.name);
                  handleIngredientDragStart(ingredient);
                }}
                onDragEnd={handleIngredientDragEnd}
              />
              <div className="ingredient-label">{ingredient.name}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Brewing beaker */}
      {isBrewing && !showBrewingResult && (
        <div
          className="brewing-beaker"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleBeakerDrop}
        >
          <img src="/assets/vial.png" alt="Vial" className="beaker-icon" />
        </div>
      )}

      {/* Brewing result image */}
      {showBrewingResult && brewingResult && (
        <div className="brewing-result-display">
          <img src={brewingResult} alt="Brewing Result" className="result-image" />
        </div>
      )}
      
      {/* Controls - match checkup stage */}
      <div className="ui-controls">
        <button className="back-button" onClick={onBack}>
          ← Back to Checkup
        </button>
        {hasXrayed && !showDiagnosis && !brewingComplete && !showHopiumSuccessDialogue && !showMuffyHopiumSuccessDialogue && (
          <button className="diagnose-button" onClick={handleDiagnose}>Diagnose</button>
        )}
        {showDiagnosis && selectedDiagnosis && showPrepHopium && (selectedCharacter === 'flick' || selectedCharacter === 'muffy' || selectedCharacter === 'cap') && !brewingComplete && !showHopiumSuccessDialogue && !showMuffyHopiumSuccessDialogue && (
          <button className="prep-hopium-button" onClick={handlePrepHopium}>
            Prep Hopium
          </button>
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
                    className={`diagnosis-btn ${askedDiagnoses.includes(diagnosis.name) ? 'disabled' : ''}`}
                    onClick={() => handleSelectDiagnosis(diagnosis)}
                    disabled={askedDiagnoses.includes(diagnosis.name)}
                  >
                    {diagnosis.name}
                  </button>
                ))}
              </div>
            )}
            {selectedDiagnosis === null && selectedCharacter === 'muffy' && (
              <div className="diagnosis-options" onClick={(e) => e.stopPropagation()}>
                <div className="diagnosis-title">Choose a diagnosis for {getCharacterName(selectedCharacter)}:</div>
                {muffyDiagnoses.map((diagnosis, idx) => (
                  <button
                    key={idx}
                    className={`diagnosis-btn ${askedDiagnoses.includes(diagnosis.name) ? 'disabled' : ''}`}
                    onClick={() => handleSelectDiagnosis(diagnosis)}
                    disabled={askedDiagnoses.includes(diagnosis.name)}
                  >
                    {diagnosis.name}
                  </button>
                ))}
              </div>
            )}
            {selectedDiagnosis === null && selectedCharacter === 'cap' && (
              <div className="diagnosis-options" onClick={(e) => e.stopPropagation()}>
                <div className="diagnosis-title">Choose a diagnosis for {getCharacterName(selectedCharacter)}:</div>
                {capDiagnoses.map((diagnosis, idx) => (
                  <button
                    key={idx}
                    className={`diagnosis-btn ${askedDiagnoses.includes(diagnosis.name) ? 'disabled' : ''}`}
                    onClick={() => handleSelectDiagnosis(diagnosis)}
                    disabled={askedDiagnoses.includes(diagnosis.name)}
                  >
                    {diagnosis.name}
                  </button>
                ))}
              </div>
            )}
            {/* Show message for characters without diagnoses */}
            {selectedDiagnosis === null && selectedCharacter !== 'flick' && selectedCharacter !== 'muffy' && selectedCharacter !== 'cap' && (
              <div className="diagnosis-options">
                <div className="diagnosis-title">Diagnosis not available for {getCharacterName(selectedCharacter)} yet.</div>
              </div>
            )}
            {/* Show diagnosis dialogue */}
            {selectedDiagnosis && (selectedCharacter === 'flick' || selectedCharacter === 'muffy' || selectedCharacter === 'cap') && !isBrewing && (
              <div className="diagnosis-dialogue">
                {(() => {
                  const line = selectedDiagnosis.dialogue[diagnosisDialogueIndex];
                  return (
                    <div>
                      <span className="patient-name">
                        {line.speaker}:
                      </span>
                      <span className="patient-dialogue">
                        {line.text}
                      </span>
                    </div>
                  );
                })()}
              </div>
            )}
            {/* Show brewing dialogue */}
            {isBrewing && !showBrewingResult && !showHopiumSuccessDialogue && (
              <div className="brewing-dialogue" onClick={handleTextboxClick}>
                <span className="patient-name">
                  Doc:
                </span>
                <span className="patient-dialogue">
                  {BREWING_DIALOGUE[brewingStep]?.text}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brewing Result Dialogue */}
      {showBrewingResult && brewingResult && (
        <div className="diagnosis-overlay">
          <div className="diagnosis-textbox" onClick={brewingResult.includes('copium') ? handleCopiumDialogueClick : undefined} style={{ cursor: brewingResult.includes('copium') ? 'pointer' : 'default' }}>
            {/* Show copium dialogue */}
            {brewingResult.includes('copium') && (
              <div className="brewing-dialogue" onClick={handleCopiumDialogueClick} style={{ cursor: 'pointer' }}>
                <span className="patient-name">
                  Doc:
                </span>
                <span className="patient-dialogue">
                  {getCopiumDialogue()}
                </span>
              </div>
            )}
            {/* Show hopium success */}
            {brewingResult.includes('hopium') && !showHopiumSuccessDialogue && (
              <div className="brewing-dialogue" onClick={(e) => {
                e.stopPropagation();
                handleHopiumSuccessClick();
              }} style={{ cursor: 'pointer' }}>
                <span className="patient-name">
                  Doc:
                </span>
                <span className="patient-dialogue">
                  Perfect! This should help.
                </span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Final Hopium Dialogue (separate from brewing result) */}
      {showHopiumSuccessDialogue && (
        <div className="diagnosis-overlay">
          <div className="diagnosis-textbox" onClick={handleTextboxClick} style={{ cursor: 'pointer' }}>
            <div className="brewing-dialogue">
              {(() => {
                const line = hopiumSuccessDialogue[hopiumDialogueIndex];
                return (
                  <div>
                    <span className="patient-name">
                      {line.speaker}:
                    </span>
                    <span className="patient-dialogue">
                      {line.text}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Muffy's Final Hopium Dialogue */}
      {showMuffyHopiumSuccessDialogue && (
        <div className="diagnosis-overlay">
          <div className="diagnosis-textbox" onClick={handleTextboxClick} style={{ cursor: 'pointer' }}>
            <div className="brewing-dialogue">
              {(() => {
                const line = muffyHopiumSuccessDialogue[muffyHopiumDialogueIndex];
                return (
                  <div>
                    <span className="patient-name">
                      {line.speaker}:
                    </span>
                    <span className="patient-dialogue">
                      {line.text}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Cap's Final Hopium Dialogue */}
      {showCapHopiumSuccessDialogue && (
        <div className="diagnosis-overlay">
          <div className="diagnosis-textbox" onClick={handleTextboxClick} style={{ cursor: 'pointer' }}>
            <div className="brewing-dialogue">
              {(() => {
                const line = capHopiumSuccessDialogue[capHopiumDialogueIndex];
                return (
                  <div>
                    <span className="patient-name">
                      {line.speaker}:
                    </span>
                    <span className="patient-dialogue">
                      {line.text}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XrayGame; 