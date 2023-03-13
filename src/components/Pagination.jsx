import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ page, pageCount, onPageChange }) {
  return (
    <div className="flex flex-col items-center my-8">
      <ReactPaginate
        pageCount={pageCount}
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={page - 1}
        containerClassName={'pagination flex justify-center items-center'}
        pageClassName={'flex items-center justify-center w-8 h-8 px-1 border rounded mx-1'}
        activeClassName={'bg-blue-500 text-white'}
        disabledClassName={'opacity-50'}
        previousClassName={'flex items-center justify-center px-1 border rounded mr-1'}
        nextClassName={'flex items-center justify-center border rounded ml-1'}
        previousLinkClassName={'block w-full h-full text-center leading-8'}
        nextLinkClassName={'block w-full h-full text-center px-1 leading-8'}
        breakClassName={'flex items-center justify-center w-8 h-8 px-1 border rounded mx-1'}
        breakLinkClassName={'block w-full h-full text-center leading-8'}
        pageLinkClassName={'block w-[100%] text-center'}
      />
    </div>
  );
}

export default Pagination;
