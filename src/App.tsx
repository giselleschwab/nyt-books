import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout";
import GenresList from "./pages/GenresList";
import GenreBooks from './pages/GenreBooks';

import { ViewModeProvider } from "./contexts/ViewModeContext";
import { SelectedGenreProvider } from "./contexts/SelectedGenreContext";
import { FavoritesProvider } from './contexts/FavoritesContext';
import { SearchProvider } from './contexts/SearchContext';


function App() {
  return (
    <SearchProvider>

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
    </SearchProvider>



  );
}

export default App;
