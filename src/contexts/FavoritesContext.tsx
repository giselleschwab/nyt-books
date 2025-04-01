// contexts/FavoritesContext.tsx
import { createContext, useContext, useState } from 'react';

interface Book {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  publisher: string;
  rank: string;
  price: string;
}

interface FavoritesContextType {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (title: string) => void;
  isFavorite: (title: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const addFavorite = (book: Book) => {
    setFavorites((prev) => [...prev, book]);
  };

  const removeFavorite = (title: string) => {
    setFavorites((prev) => prev.filter((b) => b.title !== title));
  };

  const isFavorite = (title: string) => {
    return favorites.some((b) => b.title === title);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
