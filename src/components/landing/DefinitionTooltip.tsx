
import { useIsMobile } from '@/hooks/use-mobile';

interface DefinitionTooltipProps {
  showTooltip: boolean;
  mousePosition: { x: number; y: number };
  scrollOffset: number;
}

export const DefinitionTooltip = ({ showTooltip, mousePosition, scrollOffset }: DefinitionTooltipProps) => {
  const isMobile = useIsMobile();

  const tooltipStyle = isMobile ? {
    position: 'absolute' as const,
    backgroundColor: 'white',
    color: 'black',
    padding: '0.5rem 1rem',
    pointerEvents: 'none' as const,
    zIndex: 50,
    fontSize: '1rem',
    letterSpacing: 'normal',
    whiteSpace: 'nowrap' as const,
    transform: `translate(-50%, ${-50 + scrollOffset}px) translate(${Math.sin(scrollOffset * 0.5) * 90}px, 0)`,
    top: '50%',
    left: '50%',
    transition: 'transform 0.1s ease-out',
  } : {
    position: 'fixed' as const,
    backgroundColor: 'white',
    color: 'black',
    padding: '0.5rem 1rem',
    pointerEvents: 'none' as const,
    zIndex: 50,
    fontSize: '1rem',
    letterSpacing: 'normal',
    whiteSpace: 'nowrap' as const,
    left: `${mousePosition.x + 10}px`,
    top: `${mousePosition.y + 10}px`,
    transform: 'translate(0, -50%)',
  };

  if (!showTooltip && !isMobile) return null;

  return (
    <div style={tooltipStyle}>
      Collins Dictionary definition, 2024
    </div>
  );
};
