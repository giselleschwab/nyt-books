import { useEffect, useState } from 'react';
import { useSelectedGenre } from '../contexts/SelectedGenreContext';
import { useViewMode } from '../contexts/ViewModeContext';
import { getBooksByGenre } from '../api/nyt';
import { usePagination } from '../hooks/usePagination';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';
import { Pagination } from '../components/Pagination';
import { usePaginationContext } from '../contexts/PaginationContext';

import { FaRegStar, FaStar } from "react-icons/fa";

interface Book {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  publisher: string;
  rank: string;
  price: string;
  amazonUrl: string;
}

export const GenreBooks = () => {
  const { selectedGenre } = useSelectedGenre();
  const { viewMode } = useViewMode();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { searchQuery } = useSearch();
  const { itemsPerPage } = usePaginationContext();

  const [books, setBooks] = useState<Book[]>([]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedBooks,
    setCurrentPage
  } = usePagination(filteredBooks, itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!selectedGenre) return;
      try {
        const data = await getBooksByGenre(selectedGenre);
        const mappedBooks: Book[] = data.map((item: any) => {
          const details = item.book_details[0];
          const asin = details.primary_isbn10;

          return {
            title: details.title,
            author: details.author,
            description: details.description,
            price: details.price.toString(),
            imageUrl: `https://images.amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`,
            rank: item.rank.toString(),
            amazonUrl: item.amazon_product_url,
          };
        });
        setBooks(mappedBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchBooks();
  }, [selectedGenre]);

  if (!selectedGenre) return null;

  return (
    <div className={`${viewMode === 'grid'
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 sm:mx-30 '
      : 'space-y-6 sm:ml-35 mx-5'
      }`}>
      {paginatedBooks.map((book, index) => {
        const isBookFavorite = isFavorite(book.title);
        const handleFavoriteClick = () => {
          (() => isBookFavorite ? removeFavorite(book.title) : addFavorite(book))();
        };

        return (
          <div
            key={index}
            className={`${viewMode === 'grid' ? 'flex flex-col items-center pt-4 pb-8' : 'flex gap-4'}`}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className={`${viewMode === 'grid' ? 'flex items-center justify-center w-24 h-36 mb-4' : 'w-30 h-40'} shadow-md`}
            />
            <div className={`${viewMode === 'grid' ? 'w-45 flex flex-col justify-between h-full' : 'flex flex-col gap-1'}`}>
              <div className={`sm:flex ${viewMode === 'grid' ? 'flex-col' : 'gap-2'}`}>
                <h3 className="font-bold text-neutro-6">{book.title}</h3>
                <div className={`${viewMode === 'grid' ? 'text-sm text-neutro-n4' : 'flex items-center gap-1'}`}>
                  {viewMode === 'grid' ? (
                    <span>
                      by {book.author}
                      <button onClick={handleFavoriteClick}>
                        {isBookFavorite ? (
                          <FaStar className="inline align-middle text-bloom-b3 ml-1 mb-1 cursor-pointer" />
                        ) : (
                          <FaRegStar className="inline align-middle text-bloom-b3 ml-1 mb-1 cursor-pointer" />
                        )}
                      </button>
                    </span>
                  ) : (
                    <>
                      <p className="text-neutro-n4 text-sm">by {book.author}</p>
                      <button onClick={handleFavoriteClick}>
                        {isBookFavorite ? (
                          <FaStar className="text-bloom-b3 cursor-pointer" />
                        ) : (
                          <FaRegStar className="text-bloom-b3 cursor-pointer" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-sm text-neutro-n6 sm:w-auto w-40">{book.description}</p>
              <p className="text-sm text-neutro-n6">Rank: {book.rank}</p>

              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 mt-4 bg-bloom-b3 text-neutro-n0 font-bold rounded-full text-sm w-max"
              >
                Compre por R${book.price}
              </a>
            </div>
          </div>
        );
      })}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
