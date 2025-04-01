import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout";
import GenresList from "./pages/GenresList";
import BooksList from "./pages/GenreBooks";

import { ViewModeProvider } from "./contexts/ViewModeContext";
import { SelectedGenreProvider } from "./contexts/SelectedGenreContext";
import { FavoritesProvider } from './contexts/FavoritesContext';


function App() {
  return (
    <FavoritesProvider>
      <SelectedGenreProvider>
        <ViewModeProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<GenresList />} />
                <Route path="/genero-livros" element={<BooksList />} />
              </Routes>
            </Layout>
          </Router>
        </ViewModeProvider>
      </SelectedGenreProvider>
    </FavoritesProvider>


  );
}

export default App;
