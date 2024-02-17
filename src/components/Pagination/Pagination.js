import React from "react";
import "./Pagination.css"; // Make sure to create this CSS file in the same folder

const Pagination = ({ pageCount, currentPage, paginate }) => {
  return (
    <nav className="pagination">
      <ul>
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className="page-link"
            >
              Previous
            </button>
          </li>
        )}
        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map(
          (number) => (
            <li
              key={number}
              className={`page-item ${
                currentPage === number ? "disabled" : ""
              }`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          )
        )}
        {currentPage < pageCount && (
          <li className="page-item">
            <button
              onClick={() =>
                currentPage < pageCount && paginate(currentPage + 1)
              }
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
