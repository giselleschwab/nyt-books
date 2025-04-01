const BASE_URL = "https://api.nytimes.com/svc/books/v3";
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const getGenreList = async () => {
  const res = await fetch(`${BASE_URL}/lists/names.json?api-key=${API_KEY}`);
  if (!res.ok) throw new Error("Erro ao buscar gêneros");
  const data = await res.json();
  return data.results;
};

export const getBooksByGenre = async (genreName: string) => {
  const res = await fetch(`${BASE_URL}/lists.json?list=${genreName}&api-key=${API_KEY}`);
  if (!res.ok) throw new Error("Erro ao buscar livros");
  const data = await res.json();
  return data.results;
};
