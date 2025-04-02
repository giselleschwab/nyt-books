interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;
  
    const goToPrevious = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };
  
    const goToNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  
    const renderPageNumbers = () => {
      const pages = [];
  
      if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1); 
  
        if (currentPage > 3) {
          pages.push(-1); 
        }
  
        if (currentPage > 2 && currentPage < totalPages - 1) {
          pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else if (currentPage === 2) {
          pages.push(2, 3);
        } else if (currentPage === totalPages - 1) {
          pages.push(totalPages - 2, totalPages - 1);
        } else if (currentPage <= 3) {
          pages.push(2, 3, 4);
        } else if (currentPage >= totalPages - 2) {
          pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
        }
  
        if (currentPage < totalPages - 2) {
          pages.push(-1);
        }
  
        pages.push(totalPages); 
      }
  
      return pages.map((page, index) => {
        if (page === -1) {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-sm text-gray-500">
              ...
            </span>
          );
        }
  
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${
              currentPage === page
                ? 'bg-neutro-n6 text-neutro-n0 border-neutro-n6 cursor-pointer'
                : 'text-gray-700 border-neutro-n5 hover:bg-neutro-n1 cursor-pointer'
            }`}
          >
            {page}
          </button>
        );
      });
    };
  
    return (
      <div className="col-span-full flex justify-center items-center gap-2 mt-4">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50 border-neutro-n4'
              : 'cursor-pointer border-neutro-n5 hover:bg-neutro-n1'
          }`}
        >
          &lt;
        </button>
  
        {/* Mobile view (esconde páginas demais) */}
        <div className="flex gap-2 sm:hidden">{renderPageNumbers()}</div>
  
        {/* Desktop view (todas as páginas) */}
        <div className="hidden sm:flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${
                currentPage === page
                  ? 'bg-neutro-n6 text-neutro-n0 border-neutro-n6 cursor-pointer'
                  : 'text-gray-700 border-neutro-n5 hover:bg-neutro-n1 cursor-pointer'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
  
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 text-sm border rounded-xl flex items-center justify-center ${
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50 border-neutro-n4'
              : 'cursor-pointer border-neutro-n5 hover:bg-neutro-n1'
          }`}
        >
          &gt;
        </button>
      </div>
    );
  };
  