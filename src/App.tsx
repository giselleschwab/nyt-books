import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout";
import GenresList from "./pages/GenresList";
import BooksList from "./pages/GenreBooks";

import { ViewModeProvider } from "./contexts/ViewModeContext";
import { SelectedGenreProvider } from "./contexts/SelectedGenreContext";


function App() {
  return (
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

  );
}

export default App;
