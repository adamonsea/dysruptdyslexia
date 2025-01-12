import { useState, useEffect } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";

const colors = [
  "#5B21B6", // Deep Purple
  "#1E40AF", // Rich Blue
  "#065F46", // Forest Green
  "#991B1B", // Deep Red
  "#1E3A8A", // Dark Navy
];

const Index = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
      // Set text color based on background brightness
      const color = colors[(currentColorIndex + 1) % colors.length];
      setTextColor(getBrightness(color) > 128 ? "#000000" : "#FFFFFF");
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
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000 font-poppins"
      style={{ backgroundColor: colors[currentColorIndex] }}
    >
      <h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 max-w-5xl leading-tight transition-colors duration-1000"
        style={{ color: textColor }}
      >
        Your child is not Dyslexic.
        <br />
        (Dys = diseased, abnormal, or faulty.)
        <br />
        Your child is just what the world needs.
      </h1>
      
      <h2
        className="text-xl md:text-2xl mb-12 transition-colors duration-1000"
        style={{ color: textColor }}
      >
        <span className="line-through">Dyslexia</span> parent and pupil launchpad. Coming soon.
      </h2>
      
      <button
        onClick={() => setShowForm(true)}
        className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-1000 hover:scale-105"
        style={{
          backgroundColor: textColor,
          color: colors[currentColorIndex],
        }}
      >
        Join waitlist
      </button>

      <WaitlistForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
};

export default Index;