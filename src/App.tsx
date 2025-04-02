import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from "./components/Layout";
import { GenresList } from "./pages/GenresList";
import { GenreBooks }from './pages/GenreBooks';

import { ViewModeProvider } from "./contexts/ViewModeContext";
import { SelectedGenreProvider } from "./contexts/SelectedGenreContext";
import { FavoritesProvider } from './contexts/FavoritesContext';
import { SearchProvider } from './contexts/SearchContext';
import { PaginationProvider } from './contexts/PaginationContext';


function App() {
  return (
    <SearchProvider>
      <PaginationProvider>
        <FavoritesProvider>
          <SelectedGenreProvider>
            <ViewModeProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<GenresList />} />
                    <Route path="/genero-livros" element={<GenreBooks />} />
                  </Routes>
                </Layout>
              </Router>
            </ViewModeProvider>
          </SelectedGenreProvider>
        </FavoritesProvider>
      </PaginationProvider>
    </SearchProvider>



  );
}

export default App;
