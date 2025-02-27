
import { useState, useEffect } from 'react';
import { useColors } from './ColorContext';
import { useIsMobile } from '@/hooks/use-mobile';

const fonts = [
  "'Plus Jakarta Sans'",
  "'Righteous'",
  "'Rubik Mono One'"
];

interface GlitchingDefinitionProps {
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showTooltip: boolean;
  mousePosition: { x: number; y: number };
  scrollOffset: number;
}

export const GlitchingDefinition = ({
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  showTooltip,
  mousePosition,
  scrollOffset
}: GlitchingDefinitionProps) => {
  const { definitionColor } = useColors();
  const [glitchWord1Font, setGlitchWord1Font] = useState(fonts[0]);
  const [glitchWord2Font, setGlitchWord2Font] = useState(fonts[0]);

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

  return (
    <span
      className="inline-block cursor-help"
      style={{ color: definitionColor }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
      <span>{")"}</span><span style={{ color: definitionColor }}>.</span>
    </span>
  );
};
