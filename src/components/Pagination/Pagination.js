import React from "react";
import "./Pagination.css";

const Pagination = ({ pageCount, currentPage, paginate }) => {
  const handleClick = (page) => {
    paginate(page);
    // Scroll to the top
    window.scrollTo({ top: 0 });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let number = 1; number <= pageCount; number++) {
      if (number === 1 || number === pageCount) {
        pageNumbers.push(
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => handleClick(number)} className="page-link">
              {number}
            </button>
          </li>
        );
      }
      // Add current page and two pages before and after it
      else if (number >= currentPage - 2 && number <= currentPage + 2) {
        pageNumbers.push(
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => handleClick(number)} className="page-link">
              {number}
            </button>
          </li>
        );
      }
      // Add ellipsis but avoid duplicates
      else if (number === currentPage - 3 || number === currentPage + 3) {
        pageNumbers.push(
          <li key={number} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <nav className="pagination">
      <ul>
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => handleClick(currentPage - 1)}
              className="page-link"
            >
              Prev
            </button>
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < pageCount && (
          <li className="page-item">
            <button
              onClick={() => handleClick(currentPage + 1)}
              className="page-link"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
