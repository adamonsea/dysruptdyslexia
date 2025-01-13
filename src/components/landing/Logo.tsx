import { useState, useEffect } from 'react';
import { useColors } from './ColorContext';

const fonts = [
  'font-serif',
  'font-mono',
  'Righteous',
  'Rubik Mono One',
  'Caudex',
];

export const Logo = () => {
  const { textColor, currentColor } = useColors();
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [currentFont, setCurrentFont] = useState(fonts[0]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchSequence = async () => {
        setIsStrikethrough(true);
        setCurrentFont(fonts[1]);
        await new Promise(r => setTimeout(r, 40));
        setCurrentFont(fonts[2]);
        setIsStrikethrough(false);
        await new Promise(r => setTimeout(r, 40));
        setCurrentFont(fonts[3]);
        setIsStrikethrough(true);
        await new Promise(r => setTimeout(r, 40));
        setCurrentFont(fonts[4]);
        setIsStrikethrough(false);
        await new Promise(r => setTimeout(r, 40));
        setCurrentFont(fonts[0]);
      };

      glitchSequence();
    }, 2000);

    return () => clearInterval(glitchInterval);
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
        className={`transition-all duration-150 ${currentFont} ${isStrikethrough ? 'line-through' : ''}`}
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