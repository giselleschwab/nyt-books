import { useViewMode } from '../contexts/ViewModeContext';
import { useSelectedGenre } from '../contexts/SelectedGenreContext';
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

  return (
    <div className="min-h-screen">
      <header className="bg-bloom-b3 text-neutro-n0 px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-evenly">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-2xl font-bold">Bloom Books</h1>

          <button className="sm:hidden">
            <StarIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center bg-neutro-n0 rounded-full px-3 py-1.5 text-gray-800 w-full sm:max-w-xl sm:flex-1">
          <SearchIcon className="w-4 h-4 mr-2 text-neutro-n3" />
          <input
            type="text"
            placeholder="Pesquise aqui..."
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <button className="hidden sm:block text-neutro-n0">
          <StarIcon className="w-6 h-6" />
        </button>
      </header>

      <div className="bg-neutro-n1 px-4 py-3 flex justify-between sm:flex-row items-center sm:justify-between">
        <h2 className="text-lg font-bold sm:ml-34">
          {selectedGenre || 'Gêneros'}
        </h2>

        <div className="flex items-center gap-2 text-sm mt-2 sm:mt-0 sm:mr-32">
          <span className="text-gray-600">Exibir</span>
          <select className="border border-gray-300 rounded px-2">
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <span className="text-gray-600">por vez</span>

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

      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
