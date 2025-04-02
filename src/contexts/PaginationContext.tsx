import { createContext, useContext, useState } from 'react';

interface PaginationContextType {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const PaginationContext = createContext<PaginationContextType>({
  itemsPerPage: 5,
  setItemsPerPage: () => {},
});

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return (
    <PaginationContext.Provider value={{ itemsPerPage, setItemsPerPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);
