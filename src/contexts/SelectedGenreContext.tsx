import { createContext, useContext, useState, ReactNode } from 'react';

type SelectedGenreContextType = {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
};

const SelectedGenreContext = createContext<SelectedGenreContextType>({
  selectedGenre: '',
  setSelectedGenre: () => {},
});

export const SelectedGenreProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <SelectedGenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </SelectedGenreContext.Provider>
  );
};

export const useSelectedGenre = () => useContext(SelectedGenreContext);
