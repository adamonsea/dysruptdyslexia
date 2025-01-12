import { useState, useEffect } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";

const colors = [
  "#8B5CF6", // Vivid Purple
  "#D946EF", // Magenta Pink
  "#F97316", // Bright Orange
  "#0EA5E9", // Ocean Blue
  "#10B981", // Emerald
];

const Index = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [contrastColor, setContrastColor] = useState("#F97316");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
      const color = colors[(currentColorIndex + 1) % colors.length];
      const brightness = getBrightness(color);
      
      // Set main text color based on background brightness
      const mainColor = brightness > 128 ? "#1A1A1A" : "#F9FAFB";
      setTextColor(mainColor);
      
      // Set contrast color for "is not dyslexic"
      setContrastColor(brightness > 128 ? "#F97316" : "#22D3EE");
    }, 7000);

    return () => clearInterval(interval);
  }, [currentColorIndex]);

  // Calculate brightness of a color
  const getBrightness = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-6 font-poppins"
      style={{ backgroundColor: colors[currentColorIndex] }}
    >
      <div className="flex-grow flex items-center justify-center">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-center max-w-7xl leading-tight uppercase tracking-normal md:tracking-wide lg:tracking-wider xl:tracking-widest hyphens-auto"
          style={{ 
            color: textColor,
            wordBreak: "break-word",
            hyphens: "auto",
            WebkitHyphens: "auto",
            msHyphens: "auto"
          }}
        >
          Your child <span style={{ color: contrastColor }}>is not Dyslexic</span>. (<a 
            href="https://www.collinsdictionary.com/dictionary/english/dys#:~:text=(d%C9%AAs%20),dysfunction"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
            style={{ color: textColor }}
          >Dys</a> = diseased, abnormal, or faulty.) Your child is just what the world needs.
        </h1>
      </div>
      
      <div className="mt-auto">
        <h2
          className="text-xl md:text-2xl mb-12"
          style={{ color: textColor }}
        >
          <span className="line-through">Dyslexia</span> parent and pupil launchpad. Coming soon.
        </h2>
        
        <button
          onClick={() => setShowForm(true)}
          className="px-8 py-4 text-lg font-semibold rounded-lg transition-transform duration-300 hover:scale-105"
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