import { useColors } from './ColorContext';

const fonts = [
  "'Plus Jakarta Sans'",
  "'Righteous'",
  "'Rubik Mono One'"
];

export const MainHeading = () => {
  const { textColor, contrastColor, definitionColor } = useColors();
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

  const heavyTextStyle = {
    fontWeight: 800,
    letterSpacing: '0.05em',
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
      Your child <span style={{ color: textColor }}>is</span> <span style={{ ...heavyTextStyle, color: contrastColor, background: `linear-gradient(0deg, ${textColor} 100%, transparent 0%)` }}>not Dys&shy;lexic...</span> <span style={{ color: definitionColor }}>{"("}</span><a 
        href="https://www.collinsdictionary.com/dictionary/english/dys#:~:text=(d%C9%AAs%20),dysfunction"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:opacity-80"
        style={{ color: definitionColor }}
      >Dys</a><span style={{ color: definitionColor }}> = </span><span style={{ 
        color: definitionColor,
        fontFamily: glitchWord1Font,
        transition: "font-family 0.05s ease-in-out"
      }}>dis&shy;eased</span><span style={{ color: definitionColor }}>, </span>ab&shy;nor&shy;mal<span style={{ color: definitionColor }}> or </span><span style={{ 
        color: definitionColor,
        fontFamily: glitchWord2Font,
        transition: "font-family 0.05s ease-in-out"
      }}>faul&shy;ty</span><span style={{ color: definitionColor }}>{")"}</span><span style={{ color: definitionColor }}>.</span>
      Your child is just what the world <span style={heavyTextStyle}>needs</span>.
    </h1>
  );
};