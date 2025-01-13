import { useState, useEffect } from 'react';
import { useColors } from './ColorContext';
import { useIsMobile } from '@/hooks/use-mobile';

const fonts = [
  "'Plus Jakarta Sans'",
  "'Righteous'",
  "'Rubik Mono One'"
];

export const MainHeading = () => {
  const { textColor, contrastColor, definitionColor } = useColors();
  const [glitchWord1Font, setGlitchWord1Font] = useState(fonts[0]);
  const [glitchWord2Font, setGlitchWord2Font] = useState(fonts[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchSequence = async () => {
        setGlitchWord1Font(fonts[1]);
        await new Promise(r => setTimeout(r, 70));
        setGlitchWord2Font(fonts[2]);
        await new Promise(r => setTimeout(r, 70));
        setGlitchWord1Font(fonts[2]);
        setGlitchWord2Font(fonts[1]);
        await new Promise(r => setTimeout(r, 70));
        setGlitchWord1Font(fonts[0]);
        setGlitchWord2Font(fonts[0]);
      };

      glitchSequence();
    }, 2500);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const offset = (window.scrollY * 0.1) % 20; // Creates a repeating offset pattern
        setScrollOffset(offset);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  const heavyTextStyle = {
    fontWeight: 800,
    letterSpacing: '0.05em',
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const tooltipStyle = isMobile ? {
    position: 'absolute' as const,
    backgroundColor: 'white',
    color: 'black',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    pointerEvents: 'none' as const,
    zIndex: 50,
    fontSize: '1rem',
    letterSpacing: 'normal',
    whiteSpace: 'nowrap' as const,
    transform: `translate(0, ${-50 + scrollOffset}px)`,
    top: '50%',
    right: '-20px',
    transition: 'transform 0.1s ease-out',
  } : {
    position: 'fixed' as const,
    backgroundColor: 'white',
    color: 'black',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    pointerEvents: 'none' as const,
    zIndex: 50,
    fontSize: '1rem',
    letterSpacing: 'normal',
    whiteSpace: 'nowrap' as const,
    left: `${mousePosition.x + 10}px`,
    top: `${mousePosition.y + 10}px`,
    transform: 'translate(0, -50%)',
  };

  return (
    <h1
      className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold text-center leading-[1.1] sm:leading-[1.2] md:leading-[1.3] lg:leading-[1.4] uppercase tracking-normal sm:tracking-wide md:tracking-wider lg:tracking-[0.1em] xl:tracking-[0.15em]"
      style={{ 
        color: textColor,
        wordBreak: "break-word",
        hyphens: "manual",
        WebkitHyphens: "manual",
        msHyphens: "manual",
        hyphenateCharacter: "‐",
        overflowWrap: "break-word",
        maxWidth: "95vw",
      }}
    >
      Your child <span style={{ color: textColor }}>is</span> <span style={{ ...heavyTextStyle, color: contrastColor, background: `linear-gradient(0deg, ${textColor} 100%, transparent 0%)` }}>not Dys&shy;lexic...</span>{" "}
      <a 
        href="https://www.collinsdictionary.com/dictionary/english/dys#:~:text=(d%C9%AAs%20),dysfunction"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-block relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
        style={{ color: definitionColor }}
      >
        <span>{"("}</span>Dys<span> = </span>
        <span style={{ 
          fontFamily: glitchWord1Font,
          transition: "font-family 0.05s ease-in-out"
        }}>dis&shy;eased</span>
        <span>, </span>
        <span>ab&shy;nor&shy;mal</span>
        <span> or </span>
        <span style={{ 
          fontFamily: glitchWord2Font,
          transition: "font-family 0.05s ease-in-out"
        }}>faul&shy;ty</span>
        <span>{")"}</span>
        {(showTooltip || isMobile) && (
          <div style={tooltipStyle}>
            Collins Dictionary definition
          </div>
        )}
      </a>
      <span style={{ color: definitionColor }}>.</span>
      Your child is just what the world <span style={heavyTextStyle}>needs</span>.
    </h1>
  );
};