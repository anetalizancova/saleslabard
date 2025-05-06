
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  isActive: boolean;
}

const Celebration: React.FC<CelebrationProps> = ({ isActive }) => {
  const [previouslyActive, setPreviouslyActive] = useState(false);
  
  useEffect(() => {
    // Only trigger celebration when transitioning from not-active to active
    if (isActive && !previouslyActive) {
      // Get the dimensions of the parent element to contain the confetti
      const parentElement = document.activeElement?.closest('.sales-rep-card') || document.body;
      const rect = parentElement.getBoundingClientRect();
      
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0,
        // Constrain the confetti to the bounds of the card
        bounds: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Particles going from left to right
        confetti({
          ...defaults,
          particleCount,
          origin: { 
            // Calculate origin position relative to the card
            x: (rect.x + rect.width * randomInRange(0.1, 0.3)) / window.innerWidth,
            y: (rect.y + rect.height * randomInRange(0.2, 0.5)) / window.innerHeight
          }
        });
        
        // Particles going from right to left
        confetti({
          ...defaults,
          particleCount,
          origin: { 
            // Calculate origin position relative to the card
            x: (rect.x + rect.width * randomInRange(0.7, 0.9)) / window.innerWidth,
            y: (rect.y + rect.height * randomInRange(0.2, 0.5)) / window.innerHeight
          }
        });
      }, 250);
    }
    
    setPreviouslyActive(isActive);
  }, [isActive, previouslyActive]);

  return null; // This component doesn't render anything visible itself
};

export default Celebration;
