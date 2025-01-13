import { useContext } from "react";
import { ColorContext } from "./ColorContext";

interface GlitchingDefinitionProps {
  mousePosition: { x: number; y: number };
  scrollOffset: number;
}

const fonts = [
  "'Plus Jakarta Sans', sans-serif",
  "'Permanent Marker', cursive",
  "'Righteous', cursive",
  "'Rubik Mono One', sans-serif",
  "'Bungee Shade', cursive",
  "'Nabla', cursive"
];

export const GlitchingDefinition = ({
  mousePosition,
  scrollOffset
}: GlitchingDefinitionProps) => {
  const { definitionColor } = useContext(ColorContext);

  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  const glitchWord1Font = getRandomFont();
  const glitchWord2Font = getRandomFont();

  const baseStyle = {
    color: definitionColor,
    textDecoration: "underline",
    textUnderlineOffset: "0.2em",
    cursor: "help",
    whiteSpace: "nowrap" as const,
  };

  // Remove the colon from the URL and ensure it's properly formatted
  const dictionaryUrl = "https://www.collinsdictionary.com/dictionary/english/dys";

  return (
    <a
      href={dictionaryUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={baseStyle}
      onClick={(e) => {
        e.preventDefault();
        window.open(dictionaryUrl, '_blank');
      }}
    >
      <span style={{
        fontFamily: glitchWord1Font,
        transition: "font-family 0.05s ease-in-out"
      }}>dys</span>
      <span>{"("}</span>
      <span style={{
        fontFamily: glitchWord2Font,
        transition: "font-family 0.05s ease-in-out"
      }}>faul&shy;ty</span>
      <span>{")"}</span><span style={{ color: definitionColor }}>.</span>
    </a>
  );
};