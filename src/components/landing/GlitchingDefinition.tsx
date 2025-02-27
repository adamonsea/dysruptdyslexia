
import { useColors } from './ColorContext';

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
}: GlitchingDefinitionProps) => {
  const { definitionColor } = useColors();

  return (
    <span
      className="inline-block cursor-help"
      style={{ color: definitionColor }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      dys
    </span>
  );
};
