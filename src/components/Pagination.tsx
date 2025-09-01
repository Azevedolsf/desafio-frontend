
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  total, 
  onPageChange 
}: PaginationProps) {


  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 2) {
      return [1, 2, 3];
    }
    
    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  // Se não há páginas para mostrar, não renderizar nada
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="px-3 py-3 flex justify-between border-t border-gray-200 ">
      <div className="flex-1 flex justify-between">
        <div className="flex items-center">
          <p className="text-sm cursor-pointer">
            <span className="font-medium">{total}</span>
            {' '}registro(s)
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex gap-1" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-1 text-gray-500 cursor-pointer"
            >
              <span className="sr-only">Anterior</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {getPageNumbers().map((pageNumber) => (
              <button

                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`relative inline-flex items-center px-2.5 rounded-md cursor-pointer text-xs ${
                  currentPage === pageNumber
                    ? "bg-[var(--color-primary)] text-white"
                    : 'text-gray-500 bg-white border border-[var(--color-border-input)]'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-1 py-1 text-gray-500 cursor-pointer"
            >
              <span className="sr-only">Próxima</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
