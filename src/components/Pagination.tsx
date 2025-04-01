interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const goToPrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const goToNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="col-span-full flex justify-center items-center gap-2 mt-4">
            <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${currentPage === 1
                    ? 'cursor-not-allowed opacity-50 border-neutro-n4'
                    : 'cursor-pointer border-neutro-n5 hover:bg-neutro-n1'
                    }`}
            >
                &lt;
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${currentPage === page
                        ? 'bg-neutro-n6 text-neutro-n0 border-neutro-n6 cursor-pointer'
                        : 'text-gray-700 border-neutro-n5 hover:bg-neutro-n1 cursor-pointer'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${currentPage === totalPages
                    ? 'cursor-not-allowed opacity-50 border-neutro-n4'
                    : 'cursor-pointer border-neutro-n5 hover:bg-neutro-n1'
                    }`}
            >
                &gt;
            </button>
        </div>
    );
};
