import { useState, useRef } from 'react'
import backgroundImage from '/assets/background.png'
import flickImage from '/assets/flick.png'
import flickXrayImage from '/assets/flick-xray.png'
import xrayImage from '/assets/xray.png'
import './App.css'

function App() {
  const [xrayPosition, setXrayPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const xrayRef = useRef(null)

  const handleMouseDown = (e) => {
    const rect = xrayRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    // Keep xray within bounds
    const maxX = window.innerWidth - 200
    const maxY = window.innerHeight - 200
    
    setXrayPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div 
      className="game-container"
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
      
      {/* Character (Flick) - Regular version */}
      <img 
        src={flickImage} 
        alt="Flick" 
        className="character-image"
      />
      
      {/* Character (Flick) - X-ray version with xray mask */}
      <img 
        src={flickXrayImage} 
        alt="Flick X-ray" 
        className="character-xray-image"
        style={{
          maskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`,
          WebkitMaskPosition: `${xrayPosition.x - 280}px ${xrayPosition.y - 120}px`
        }}
      />
      
      {/* Draggable X-ray */}
      <img 
        src={xrayImage} 
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
    </div>
  )
}

export default App