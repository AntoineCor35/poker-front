import React, { useState, useEffect } from 'react';

/**
 * Pixel art animation component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.interval - Animation interval in milliseconds
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.isActive - Whether the animation is active
 */
const PixelAnimation = ({ 
  children, 
  interval = 500, 
  className = '',
  isActive = true 
}) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 4);
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval, isActive]);

  // Apply step-by-step animation based on frame
  const animationClass = animationFrame % 2 === 0 ? "translate-y-0" : "translate-y-1";

  return (
    <div className={`transition-all duration-300 ease-in-out ${animationClass} ${className}`}>
      {children}
    </div>
  );
};

export default PixelAnimation; 