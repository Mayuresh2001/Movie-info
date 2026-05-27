import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ updateParam, results, theme }) {
  const pages = Math.ceil(results / 10);

  const handlePageChange = ({ selected }) => {
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set('page', selected + 1);
      return newParam.toString();
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`pagination-wrapper ${theme === 'dark' ? 'pagination-dark' : 'pagination-light'}`}>
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
    </div>
  );
}

export default Pagination;