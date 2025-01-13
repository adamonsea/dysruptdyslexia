import { useState, useEffect } from 'react';
import { useColors } from './ColorContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { GlitchingDefinition } from './GlitchingDefinition';
import { DefinitionTooltip } from './DefinitionTooltip';

export const MainHeading = () => {
  const { textColor, contrastColor, definitionColor } = useColors();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        // Create a more dynamic, proton-like movement with increased amplitude
        const baseOffset = window.scrollY * 0.5; // Increased from 0.1 to 0.5
        const randomJump = Math.sin(baseOffset) * 45; // Increased from 15 to 45
        const quantumJump = (Math.random() - 0.5) * 60; // Increased from 20 to 60
        
        // Combine movements for a more pronounced, proton-like effect
        const totalOffset = baseOffset + randomJump + quantumJump;
        setScrollOffset(totalOffset);
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
      <GlitchingDefinition
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
        showTooltip={showTooltip}
        mousePosition={mousePosition}
        scrollOffset={scrollOffset}
      />
      Your child is just what the world <span style={heavyTextStyle}>needs</span>.
      <DefinitionTooltip
        showTooltip={showTooltip}
        mousePosition={mousePosition}
        scrollOffset={scrollOffset}
      />
    </h1>
  );
};