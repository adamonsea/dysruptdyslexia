import { useColors } from './ColorContext';

export const SubHeading = () => {
  const { textColor } = useColors();
  
  return (
    <h2
      className="text-2xl sm:text-3xl md:text-4xl text-center w-full px-4"
      style={{ color: textColor }}
    >
      <span className="line-through">Dyslexia</span> parent and pupil launchpad. Coming soon.
    </h2>
  );
};