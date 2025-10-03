import React from "react";
import usePagination, { DOTS } from "@src/hooks/usePagination";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalPages,
  currentPage,
}) => {
  const paginationRange = usePagination({ currentPage, totalPages });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-3 py-2 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-100 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={index}
                className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300"
              >
                ...
              </li>
            );
          }
          return (
            <li key={index}>
              <button
                onClick={() => onPageChange(pageNumber as number)}
                className={`px-3 py-2 leading-tight border ${
                  currentPage === pageNumber
                    ? "bg-sky-100 text-sky-600 border-sky-300"
                    : "text-slate-500 bg-white border-slate-300 hover:bg-slate-100"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={onNext}
            disabled={currentPage === lastPage}
            className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-100 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
