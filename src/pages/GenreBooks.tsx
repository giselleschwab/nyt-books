import { useEffect, useState } from 'react';
import { useSelectedGenre } from '../contexts/SelectedGenreContext';
import { useViewMode } from '../contexts/ViewModeContext';
import { getBooksByGenre } from '../api/nyt';
import { usePagination } from '../hooks/usePagination';
import { FaRegStar } from "react-icons/fa";

interface Book {
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    publisher: string;
    rank: string;
    price: string;
}

const BooksList = () => {
    const { selectedGenre } = useSelectedGenre();
    const { viewMode } = useViewMode();
    const [books, setBooks] = useState<Book[]>([]);

    const {
        currentPage,
        totalPages,
        paginatedItems: paginatedBooks,
        setCurrentPage
    } = usePagination(books, 5);

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
                        publisher: item.publisher,
                        rank: item.rank.toString(),
                       
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
        <div
            className={`${viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 sm:mx-30 '
                : 'space-y-6 sm:ml-35 mx-5'
                }`}
        >
            {paginatedBooks.map((book, index) => (
                <div
                    key={index}
                    className={`${viewMode === 'grid' ? 'flex flex-col items-center pt-4 pb-8' : 'flex gap-4'
                        }`}
                >
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className={`${viewMode === 'grid' ? 'flex items-center justify-center w-24 h-36 mb-4' : 'w-30 h-40'
                            }  shadow-md`}
                    />
                    <div
                        className={`${viewMode === 'grid' ? 'w-45 flex flex-col justify-between h-full' : 'flex flex-col gap-1'}`}
                    >
                        <div
                            className={`sm:flex ${viewMode === 'grid' ? 'flex-col' : 'gap-2'
                                }`}
                        >
                            <h3 className="font-bold text-neutro-6">{book.title}</h3>
                            <div className='flex items-center gap-1'>
                                <p className="text-neutro-n4 text-sm">by {book.author}</p>
                                <FaRegStar className="text-bloom-b3" />
                            </div>
                        </div>

                        <p className="text-sm text-neutro-n6">{book.description}</p>
                        <p className="text-sm text-neutro-n6">{book.publisher}</p>
                        <p className="text-sm text-neutro-n6">Rank: {book.rank}</p>

                        <button className="px-3 py-2 mt-4 bg-bloom-b3 text-neutro-n0 rounded-full text-sm w-max">
                           {book.price}
                        </button>
                    </div>
                </div>
            ))}

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

export default BooksList;
