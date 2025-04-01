import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewMode } from '../contexts/ViewModeContext';
import { useSelectedGenre } from '../contexts/SelectedGenreContext';
import { getGenreList } from '../api/nyt';
import { usePagination } from '../hooks/usePagination';
import { useSearch } from '../contexts/SearchContext';

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

      {/* Paginação */}
      <div className="col-span-full flex justify-center items-center gap-1 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 text-sm border-1 rounded-xl cursor-pointer border-neutro-n5 ${currentPage === page ? 'bg-neutro-n5 text-neutro-n0' : 'text-gray-700 hover:bg-neutro-n1'
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
