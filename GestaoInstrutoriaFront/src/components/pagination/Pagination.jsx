import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "./pagination.css"

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='pagination-pages'>
      <div className='pagination'>
        <div>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className='page-link'
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div>
          <span className='page-number'>
            {currentPage} de {totalPages}
          </span>
        </div>
        <div>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className='page-link'
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
