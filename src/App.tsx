import Layout from "./components/Layout";
import GenresList from "./pages/GenresList";
import { ViewModeProvider } from "./contexts/ViewModeContext"; // <- importe aqui

function App() {
  return (
    <ViewModeProvider>
      <Layout>
        <GenresList />
      </Layout>
    </ViewModeProvider>
  );
}

export default App;
