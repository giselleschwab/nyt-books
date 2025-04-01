import { useState } from 'react';
import { useViewMode } from '../contexts/ViewModeContext';
type Genre = {
  id: number;
  name: string;
  updatedAt: string;
  newestPublishedDate: string;
  oldestPublishedDate: string;
};

const mockGenres: Genre[] = [
  {
    id: 1,
    name: 'Combined Print & E-Book Fiction',
    updatedAt: '01/03/2024',
    newestPublishedDate: '01/03/2024',
    oldestPublishedDate: '01/03/2024',
  },
  {
    id: 2,
    name: 'Combined Print & E-Book Fiction',
    updatedAt: '01/03/2024',
    newestPublishedDate: '01/03/2024',
    oldestPublishedDate: '01/03/2024',
  },
  {
    id: 3,
    name: 'Hardcover Nonfiction',
    updatedAt: '01/03/2024',
    newestPublishedDate: '01/03/2024',
    oldestPublishedDate: '01/03/2024',
  },
  {
    id: 4,
    name: 'Hardcover Nonfiction',
    updatedAt: '01/03/2024',
    newestPublishedDate: '01/03/2024',
    oldestPublishedDate: '01/03/2024',
  },
  {
    id: 5,
    name: 'Hardcover Nonfiction',
    updatedAt: '01/03/2024',
    newestPublishedDate: '01/03/2024',
    oldestPublishedDate: '01/03/2024',
  },
];


const GenresList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { viewMode } = useViewMode();

  return (
    <div className={`space-y-6 sm:mx-30 ${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-5 sm:gap-5 space-y-0' : ''}`}>
      {mockGenres.map((genre) => (
        <div
          key={genre.id}
          className={`pb-3 ${viewMode === 'grid'
              ? 'p-4'
              : 'flex flex-col sm:flex-row sm:justify-between sm:items-center'
            }`}
        >
          <div>
            <a href="#" className="underline text-xl text-bloom-b3">{genre.name}</a>
            <span className={`text-[0.625rem] text-neutro-n3 italic block ${viewMode === 'grid' ? 'block' : 'sm:inline sm:ml-4'
              }`}>
              Atualizado em {genre.updatedAt}
            </span>
          </div>

          <div className={`flex flex-col gap-1 text-xs text-neutro-n4 mt-2 sm:mt-0 ${viewMode === 'grid' ? 'flex-col' : 'sm:flex-row sm:gap-20'}`}>
            <span>Última publicação: {genre.newestPublishedDate}</span>
            <span>Publicação mais antiga: {genre.oldestPublishedDate}</span>
          </div>
        </div>
      ))}

      {/* Paginação */}
      <div className="col-span-full flex justify-center items-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8  text-sm border-1 rounded-xl cursor-pointer border-neutro-n5 ${currentPage === page
                ? 'bg-neutro-n5 text-neutro-n0'
                : 'text-gray-700 hover:bg-neutro-n1'
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
