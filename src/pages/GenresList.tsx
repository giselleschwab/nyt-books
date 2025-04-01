import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewMode } from '../contexts/ViewModeContext';
import { useSelectedGenre } from '../contexts/SelectedGenreContext';
import { getGenreList } from '../api/nyt';
import { usePagination } from '../hooks/usePagination';
import { useSearch } from '../contexts/SearchContext';
import { Pagination } from '../components/Pagination';

interface Genre {
  list_name: string;
  display_name: string;
  updated: string;
  newest_published_date: string;
  oldest_published_date: string;
}

const GenresList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { viewMode } = useViewMode();
  const { setSelectedGenre } = useSelectedGenre();
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  const filteredGenres = genres.filter((genre) =>
    genre.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedGenres,
    setCurrentPage
  } = usePagination(filteredGenres, 5);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenreList();
        setGenres(data);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className={`space-y-6 sm:mx-30 ${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-5 sm:gap-5 space-y-0' : ''}`}>
      {paginatedGenres.map((genre) => (
        <div
          key={genre.list_name}
          className={`pb-3 ${viewMode === 'grid'
            ? 'p-4'
            : 'flex flex-col sm:flex-row sm:justify-between sm:items-center'
            }`}
        >
          <div>
            <a
              href="#"
              className="underline text-xl text-bloom-b3"
              onClick={(e) => {
                e.preventDefault();
                setSelectedGenre(genre.list_name);
                navigate('/genero-livros');
              }}
            >
              {genre.display_name}
            </a>
            <span className={`text-[0.625rem] text-neutro-n3 italic block ${viewMode === 'grid' ? 'block' : 'sm:inline sm:ml-4'}`}>
              Atualizada em {genre.updated}
            </span>
          </div>

          <div className={`flex flex-col gap-1 text-xs text-neutro-n4 mt-2 sm:mt-0 ${viewMode === 'grid' ? 'flex-col' : 'sm:flex-row sm:gap-20'}`}>
            <span>Última publicação: {genre.newest_published_date}</span>
            <span>Publicação mais antiga: {genre.oldest_published_date}</span>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
    </div>
  );
};

export default GenresList;
