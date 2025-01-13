import { createContext, useContext } from 'react';

type ColorContextType = {
  textColor: string;
  contrastColor: string;
  definitionColor: string;
  currentColor: string;
};

export const ColorContext = createContext<ColorContextType>({
  textColor: '#FFFFFF',
  contrastColor: '#F97316',
  definitionColor: '#22D3EE',
  currentColor: '#8B5CF6',
});

export const useColors = () => useContext(ColorContext);