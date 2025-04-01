import { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'list' | 'grid';

type ViewModeContextType = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error('useViewMode deve ser usado dentro de um ViewModeProvider');
  return context;
};
