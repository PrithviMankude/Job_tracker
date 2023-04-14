import React from 'react';
import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1
      // alternative
      newPage = numOfPages;
    }
    changePage(newPage);
    console.log('Prev Page');
  };

  const nextPage = () => {
    let newPage = page + 1;
    console.log('Page:', page);
    console.log(newPage);
    if (newPage > numOfPages) {
      console.log('In the function');
      newPage = 1;
    }
    console.log('Before Change call', newPage);
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <button className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              type='button'
              onClick={() => {
                changePage(pageNumber);
              }}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            >
              {pageNumber}
            </button>
          );
        })}
      </button>
      <button className='next-btn' onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
