import { useState, useEffect } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Logo } from "@/components/landing/Logo";
import { MainHeading } from "@/components/landing/MainHeading";
import { SubHeading } from "@/components/landing/SubHeading";
import { ColorContext } from "@/components/landing/ColorContext";

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

const Index = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [contrastColor, setContrastColor] = useState("#F97316");
  const [definitionColor, setDefinitionColor] = useState("#22D3EE");
  const [showForm, setShowForm] = useState(false);

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

    return () => clearInterval(colorInterval);
  }, [currentColorIndex]);

  const getBrightness = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  return (
    <ColorContext.Provider value={{ 
      textColor, 
      contrastColor, 
      definitionColor,
      currentColor: colors[currentColorIndex]
    }}>
      <div
        className="min-h-screen flex flex-col justify-between items-center p-2 sm:p-3 md:p-4 lg:p-6 relative"
        style={{ backgroundColor: colors[currentColorIndex] }}
      >
        <Logo />

        <div className="flex-1 flex items-center justify-center w-full mt-24">
          <MainHeading />
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-12 sm:space-y-16 md:space-y-20 mb-12 sm:mb-16 md:mb-20 w-full">
          <SubHeading />
          
          <button
            onClick={() => setShowForm(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold transition-transform duration-300 hover:scale-105"
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
    </ColorContext.Provider>
  );
};

export default Index;