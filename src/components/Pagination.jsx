import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactPaginateModule from 'react-paginate';

const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

const activeClasses =
  " !border-transparent !bg-gradient-to-br !from-[var(--red)] " +
  "!to-[var(--red-dark)] !text-white " +
  "shadow-[0_2px_10px_var(--red-glow)]";

const baseClasses =
  "flex h-9 w-9 items-center justify-center rounded-lg " +
  "cursor-pointer text-[0.83rem] font-medium font-['Inter'] " +
  "transition-all duration-300";

const lightClasses =
  "border border-black/[0.09] bg-black/[0.04] text-[#6b7a8d] " +
  "hover:border-[rgba(230,57,70,0.25)] " +
  "hover:bg-[rgba(230,57,70,0.08)] hover:text-[#1a1d2e]";

const darkClasses =
  "border border-white/[0.09] bg-white/[0.05] text-[#5a6a7e] " +
  "hover:border-[rgba(230,57,70,0.33)] " +
  "hover:bg-[rgba(230,57,70,0.14)] hover:text-white";

const Pagination = ({ updateParam, results, theme }) => {

  const pages = Math.ceil(results / 10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set('page', currentPage);
      return newParam.toString();
    });
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage])

  const generatePagination = (currPage, totalPages) => {
    const visiblePages = 100;

    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let pages = [];

    if (currPage <= 3) {
      pages = [1, 2, 3, 4, "...", totalPages];
    } else if (currPage >= totalPages - 2) {
      pages = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        1,
        "...",
        currPage - 1,
        currPage,
        currPage + 1,
        "...",
        totalPages,
      ];
    }

    return pages;
  };

  const handlePageAction = (action) => {
    if (action === 'next') {
      setCurrentPage(currentPage + 1)
    }
    if (action === 'prev') {
      setCurrentPage(currentPage - 1)
    }
    if (action === 'first') {
      setCurrentPage(1)
    }
    if (action === 'last') {
      setCurrentPage(pages)
    }
  }

  console.log(currentPage, pages, 'pages')
  return (
    <>
      <div
        className={`pagination-wrapper ${theme === "dark" ? "pagination-dark" : "pagination-light"
          }`}
      >
        <div className="flex flex-wrap list-none items-center justify-center gap-1">
          {/* First page */}
          <button
            className={[baseClasses, theme === "dark" ? darkClasses : lightClasses].join(" ")}
            onClick={() => handlePageAction('first')} disabled={currentPage === 1} aria-label="First page" title="First page">

            <ChevronsLeft size={18} />
          </button>

          {/* Previous page */}
          <button
            className={[baseClasses, theme === "dark" ? darkClasses : lightClasses].join(" ")}
            onClick={() => handlePageAction('prev')}
            disabled={currentPage === 1} aria-label="Previous page" title="Previous page">
            <ChevronLeft size={18} />
          </button>
          {generatePagination(currentPage, pages).map((page, i) => {
            if (page === "...") {
              return <span key={`ellipsis-${i}`}>...</span>;
            }
            const isActive = currentPage === page;
            return (<>

              <div
                key={page}
                className={[
                  baseClasses,
                  theme === "dark" ? darkClasses : lightClasses,
                  isActive ? activeClasses : "",
                ].join(" ")}
                onClick={() => setCurrentPage(page)}>
                {page}
              </div>
            </>);
          })}
          {/* Next page */} <button className={[baseClasses, theme === "dark" ? darkClasses : lightClasses].join(" ")} onClick={() => handlePageAction('next')} disabled={currentPage === pages} aria-label="Next page" title="Next page">

            <ChevronRight size={18} />
          </button>

          {/* Last page */} <button
            className={[baseClasses, theme === "dark" ? darkClasses : lightClasses].join(" ")} onClick={() => handlePageAction('last')} disabled={currentPage === pages} aria-label="Last page" title="Last page">

            <ChevronsRight size={18} />
          </button>
        </div >
      </div >

      {/* <div className={`pagination-wrapper ${theme === 'dark' ? 'pagination-dark' : 'pagination-light'}`}>
        <ReactPaginate
          breakLabel="…"
          previousLabel="← Prev"
          nextLabel="Next →"
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageChange}
          containerClassName="pagination-container"
          pageClassName=""
          pageLinkClassName="pagination-number"
          activeClassName=""
          activeLinkClassName="pagination-active"
          previousClassName=""
          previousLinkClassName="arrow"
          nextClassName=""
          nextLinkClassName="arrow"
          disabledLinkClassName="btn-disabled"
        />
      </div> */}


    </>);
}

export default Pagination;  