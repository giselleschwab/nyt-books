import { useSelectedGenre } from '../contexts/SelectedGenreContext';
import { useViewMode } from '../contexts/ViewModeContext';
import { FaRegStar } from "react-icons/fa";

interface Book {
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    publisher: string;
    rank: string
}

const mockBooksByGenre: Record<string, Book[]> = {
    'Hardcover Nonfiction': [
        {
            title: 'WHILE JUSTICE SLEEPS',
            author: 'Stacey Abrams',
            description:
                'A Supreme Court clerk has to unravel a conspiracy involving her boss after he falls into a coma.',
            imageUrl: 'https://covers.openlibrary.org/b/id/10221691-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
        {
            title: 'SOULEY',
            author: 'John Graham',
            description:
                'An orphaned boy in Sudan finds a new path when he moves to the United States.',
            imageUrl: 'https://covers.openlibrary.org/b/id/11153845-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
        {
            title: 'THE LAST THING HE TOLD ME',
            author: 'Laura Dave',
            description:
                'A woman forms an unexpected relationship with her stepdaughter while searching for the truth about her missing husband.',
            imageUrl: 'https://covers.openlibrary.org/b/id/11147953-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
        {
            title: 'THAT SUMMER',
            author: 'Jennifer Weiner',
            description:
                'A woman’s life is turned upside down when she begins receiving emails meant for someone else with the same name.',
            imageUrl: 'https://covers.openlibrary.org/b/id/11147955-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
        {
            title: 'PEOPLE WE MEET ON VACATION',
            author: 'Emily Henry',
            description:
                'Opposites attract when two best friends go on vacation together.',
            imageUrl: 'https://covers.openlibrary.org/b/id/11147952-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
    ],
    'Combined Print & E-Book Fiction': [
        {
            title: 'THE LINCOLN HIGHWAY',
            author: 'Amor Towles',
            description:
                'In 1954, four boys set out on a journey that will change their lives forever.',
            imageUrl: 'https://covers.openlibrary.org/b/id/11149770-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
        {
            title: 'THE MIDNIGHT LIBRARY',
            author: 'Matt Haig',
            description:
                'Between life and death there is a library, and within that library, the shelves go on forever.',
            imageUrl: 'https://covers.openlibrary.org/b/id/11097887-L.jpg',
            publisher: 'Editora Bloom',
            rank: 'Rank'
        },
    ],
};

const BooksList = () => {
    const { selectedGenre } = useSelectedGenre();
    const { viewMode } = useViewMode();

    const books = mockBooksByGenre[selectedGenre] || [];

    if (!selectedGenre) return null;

    return (
        <div
            className={`${viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 sm:mx-30 '
                : 'space-y-6 sm:ml-35 mx-5'
                }`}
        >
            {books.map((book, index) => (
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
                            Comprar ou ler
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BooksList;
