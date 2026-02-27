import { useSearchParams } from "react-router";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Go to previous page"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_left
        </span>
        Previous
      </button>

      <div className="pagination-info" aria-live="polite" aria-atomic="true">
        <span className="pagination-current" aria-current="page">
          {currentPage}
        </span>
        <span className="pagination-separator">/</span>
        <span>{totalPages}</span>
      </div>

      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Go to next page"
      >
        Next
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </nav>
  );
};
