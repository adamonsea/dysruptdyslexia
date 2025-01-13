import { useState, useEffect } from 'react';
import { useColors } from './ColorContext';

export const Logo = () => {
  const { textColor, currentColor } = useColors();
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  useEffect(() => {
    const strikethroughInterval = setInterval(() => {
      setIsStrikethrough(prev => !prev);
    }, 800);

    return () => clearInterval(strikethroughInterval);
  }, []);

  return (
    <div 
      className="absolute top-4 left-4 text-sm sm:text-base md:text-lg font-bold tracking-tight mb-16 font-logo flex items-center gap-2"
      style={{ 
        color: textColor,
        fontWeight: 800
      }}
    >
      <span 
        style={{ 
          color: currentColor,
          backgroundColor: '#FFFFFF',
          padding: '0.1em 0.3em',
          borderRadius: '0.1em'
        }}
      >
        DYSDYS 
      </span>
      The campaign to abolish<span
        className={`transition-all duration-150 ${isStrikethrough ? 'line-through' : ''}`}
        style={{ 
          textDecorationColor: textColor,
          textDecorationThickness: '1px',
          marginLeft: '-0.15em',
          letterSpacing: '-0.02em'
        }}
      >dyslexia</span>
    </div>
  );
};