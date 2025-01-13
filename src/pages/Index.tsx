import { useState, useEffect } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";

const colors = [
  "#8B5CF6", // Vivid Purple
  "#D946EF", // Magenta Pink
  "#F97316", // Bright Orange
  "#0EA5E9", // Ocean Blue
  "#10B981", // Emerald
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#F43F5E", // Rose
  "#3B82F6", // Blue
  "#06B6D4", // Cyan
  "#22C55E", // Green
  "#EAB308", // Yellow
  "#A855F7", // Purple
  "#E11D48", // Red
  "#0891B2", // Dark Cyan
  "#059669", // Dark Emerald
  "#7C3AED", // Violet
  "#DB2777", // Deep Pink
  "#EA580C", // Deep Orange
];

const fonts = [
  "'Plus Jakarta Sans'", // Base font
  "'Righteous'",        // Similar width glitch font 1
  "'Rubik Mono One'"    // Similar width glitch font 2
];

const Index = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [contrastColor, setContrastColor] = useState("#F97316");
  const [definitionColor, setDefinitionColor] = useState("#22D3EE");
  const [showForm, setShowForm] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
      const color = colors[(currentColorIndex + 1) % colors.length];
      const brightness = getBrightness(color);
      
      const mainColor = brightness > 128 ? "#1A1A1A" : "#F9FAFB";
      setTextColor(mainColor);
      setContrastColor(brightness > 128 ? "#F97316" : "#22D3EE");
      setDefinitionColor(brightness > 128 ? "#6366F1" : "#D946EF");
    }, 7000);

    const glitchInterval = setInterval(() => {
      const glitchSequence = async () => {
        setCurrentFontIndex(1);
        await new Promise(r => setTimeout(r, 70));
        setCurrentFontIndex(2);
        await new Promise(r => setTimeout(r, 70));
        setCurrentFontIndex(1);
        await new Promise(r => setTimeout(r, 70));
        setCurrentFontIndex(0);
      };

      glitchSequence();
    }, 2500);

    // Faster strikethrough glitch effect
    const strikethroughInterval = setInterval(() => {
      setIsStrikethrough(prev => !prev);
    }, 800); // Reduced from 2000ms to 800ms for glitchier effect

    return () => {
      clearInterval(colorInterval);
      clearInterval(glitchInterval);
      clearInterval(strikethroughInterval);
    };
  }, [currentColorIndex]);

  const getBrightness = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const heavyTextStyle = {
    fontWeight: 800,
    letterSpacing: '0.05em',
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between items-center p-2 sm:p-3 md:p-4 lg:p-6 relative"
      style={{ backgroundColor: colors[currentColorIndex] }}
    >
      {/* Logo text */}
      <div 
        className="absolute top-4 left-4 text-sm sm:text-base md:text-lg font-bold tracking-tight mb-16"
        style={{ 
          color: textColor,
          fontFamily: "'Caudex', serif",
          fontWeight: 700
        }}
      >
        The campaign to abolish <span 
          className={`transition-all duration-150 ${isStrikethrough ? 'line-through' : ''}`}
          style={{ 
            textDecorationColor: textColor,
            textDecorationThickness: '1px',
            fontFamily: fonts[currentFontIndex],
            transition: "font-family 0.05s ease-in-out"
          }}
        >
          dyslexia
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full mt-24">
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
          Your child <span style={{ color: textColor }}>is</span> <span style={{ ...heavyTextStyle, color: contrastColor, background: `linear-gradient(0deg, ${textColor} 100%, transparent 0%)` }}>not Dys&shy;lexic...</span> <span style={{ color: definitionColor }}>("</span><a 
            href="https://www.collinsdictionary.com/dictionary/english/dys#:~:text=(d%C9%AAs%20),dysfunction"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
            style={{ color: definitionColor }}
          >Dys</a> <a 
            href="https://www.collinsdictionary.com/dictionary/english/dys#:~:text=(d%C9%AAs%20),dysfunction"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
            style={{ 
              color: definitionColor,
              fontFamily: fonts[currentFontIndex],
              transition: "font-family 0.05s ease-in-out"
            }}
          >= dis&shy;eased, ab&shy;nor&shy;mal or faul&shy;ty</a><span style={{ color: definitionColor }}>")</span><span style={{ color: definitionColor }}>.</span> Your child is just what the world <span style={heavyTextStyle}>needs</span>.
        </h1>
      </div>
      
      <div className="flex flex-col items-center justify-center space-y-12 sm:space-y-16 md:space-y-20 mb-12 sm:mb-16 md:mb-20 w-full">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl text-center w-full px-4"
          style={{ color: textColor }}
        >
          <span className="line-through">Dyslexia</span> parent and pupil launchpad. Coming soon.
        </h2>
        
        <button
          onClick={() => setShowForm(true)}
          className="px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-lg transition-transform duration-300 hover:scale-105"
          style={{
            backgroundColor: textColor,
            color: colors[currentColorIndex],
          }}
        >
          Join waitlist
        </button>
      </div>

      <WaitlistForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
};

export default Index;