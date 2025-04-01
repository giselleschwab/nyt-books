import { useState } from 'react';
import { useViewMode } from '../contexts/ViewModeContext';
import { useSelectedGenre } from '../contexts/SelectedGenreContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';
import { FiChevronDown } from 'react-icons/fi';

import SearchIcon from '@/assets/icons/search.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import GridIcon from '@/assets/icons/grid.svg?react';

import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { viewMode, setViewMode } = useViewMode();
  const { selectedGenre } = useSelectedGenre();
  const { favorites } = useFavorites();
  const { searchQuery, setSearchQuery } = useSearch();

  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="min-h-screen relative">
      {showFavorites && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={() => setShowFavorites(false)}
        />
      )}

      <header className="relative z-50 bg-bloom-b3 text-neutro-n0 pl-5 flex sm:p-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-evenly">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-2xl font-bold">Bloom Books</h1>

          <button
            className={`sm:hidden h-14 w-20 flex items-center justify-center ${showFavorites ? 'bg-bloom-b4' : ''
              }`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <StarIcon className={`w-6 h-6 cursor-pointer ${showFavorites ? 'text-white' : ''}`} />
          </button>
        </div>

        <div className="flex items-center bg-neutro-n0 rounded-full px-3 py-2 mb-2 text-gray-800 w-[95%] sm:max-w-xl sm:flex-1">
          <SearchIcon className="w-4 h-4 mr-2 text-neutro-n3" />
          <input
            type="text"
            placeholder="Pesquise aqui..."
            className="bg-transparent outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        </div>

        <div className="py-0">
          <button
            className={`hidden sm:flex items-center justify-center w-18 h-16 py-0 ${showFavorites ? 'bg-bloom-b4' : ''
              }`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <StarIcon className={`w-6 h-6 cursor-pointer ${showFavorites ? 'text-white' : ''}`} />
          </button>
        </div>
      </header>

      {showFavorites && (
        <div className="absolute top-[64px] right-0 w-72 h-[1px] bg-bloom-b4 z-50" />
      )}

      <div className="bg-neutro-n1 px-4 py-3 flex justify-between sm:flex-row items-center sm:justify-between relative z-10">
        <h2 className="text-lg font-bold sm:ml-34">
          {selectedGenre || 'Gêneros'}
        </h2>

        <div className="flex items-center gap-2 text-sm mt-2 sm:mt-0 sm:mr-32">

          <span>Exibir</span>
          <div className="relative">
            <select
              className="bg-transparent underline decoration-neutro-n3 cursor-pointer appearance-none px-1 pr-5 focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <FiChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-sm" />
          </div>
          <span className="hidden sm:inline">por vez</span>


          <button className="ml-3" onClick={() => setViewMode('list')}>
            <ListIcon
              className={`w-5 h-5 cursor-pointer ${viewMode === 'list' ? 'text-bloom-b3' : 'text-neutro-n2'}`}
            />
          </button>
          <button onClick={() => setViewMode('grid')}>
            <GridIcon
              className={`w-5 h-5 cursor-pointer ${viewMode === 'grid' ? 'text-bloom-b3' : 'text-neutro-n2'}`}
            />
          </button>
        </div>
      </div>

      <main className="p-4 relative z-10">{children}</main>

      {showFavorites && (
        <aside className="fixed right-0 top-14 sm:top-16 w-full max-w-sm h-[calc(100vh-64px)] bg-neutro-n0 shadow-lg p-4 z-50 overflow-y-auto border-t-8 border-bloom-b4 sm:absolute">

          <h3 className="text-lg font-semibold mb-4">Favoritos</h3>

          {favorites.length === 0 ? (
            <p className="text-sm text-neutro-n3">Nenhum livro favoritado ainda.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {favorites.map((book, index) => (
                <li key={index} className="flex items-start gap-3">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-10 h-16 object-cover rounded shadow"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-xs text-neutro-n3">by {book.author}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      )}
    </div>
  );
};

export default Layout;
