import classNames from 'classnames';

const NUMBER_OF_PAGES = 3;
const NUMBER_OF_PAGES_HALF = Math.ceil(NUMBER_OF_PAGES / 2);

const PAGE_CLASS_NAME =
  'h-[28px] w-[28px] rounded-[8px] flex items-center justify-center text-[14px]';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = [];
  if (totalPages <= NUMBER_OF_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    let leftSide = Math.ceil(NUMBER_OF_PAGES / 2);
    let rightSide = NUMBER_OF_PAGES - leftSide;

    if (currentPage > totalPages - Math.trunc(NUMBER_OF_PAGES / 2)) {
      rightSide = totalPages - currentPage;
      leftSide = NUMBER_OF_PAGES - rightSide;
    } else if (currentPage < leftSide) {
      leftSide = currentPage;
      rightSide = NUMBER_OF_PAGES - leftSide;
    }
    for (let i = leftSide - 1; i >= 0; i -= 1) {
      pages.push(currentPage - i);
    }
    for (let i = 1; i <= rightSide; i += 1) {
      pages.push(currentPage + i);
    }
  }

  const renderPage = (page: number) => {
    function onClick() {
      if (page !== currentPage) {
        onPageChange(page);
      }
    }
    return (
      <div
        className={classNames(
          PAGE_CLASS_NAME,
          'cursor-pointer',
          page === currentPage
            ? 'bg-orange text-white'
            : 'bg-lightOrange text-black'
        )}
        onClick={onClick}
        key={page}
      >
        {page}
      </div>
    );
  };

  const RenderArrow = (direction: 'left' | 'right') => {
    function onClick() {
      if (
        (currentPage !== 1 && direction === 'left') ||
        (currentPage !== totalPages && direction === 'right')
      ) {
        const nextPage =
          direction === 'left' ? currentPage - 1 : currentPage + 1;
        onPageChange(nextPage);
      }
    }

    const arrow = direction === 'left' ? '<' : '>';

    return <span onClick={onClick}>{arrow}</span>;
  };

  return (
    <div className="flex items-center gap-[5px]">
      {/* totalPages > 1 && RenderArrow('left') */}
      {totalPages > NUMBER_OF_PAGES && currentPage > NUMBER_OF_PAGES_HALF && (
        <>
          {renderPage(1)}
          {currentPage !== NUMBER_OF_PAGES && <div>...</div>}
        </>
      )}
      {pages.map(renderPage)}
      {totalPages > NUMBER_OF_PAGES &&
        currentPage < totalPages - (NUMBER_OF_PAGES - NUMBER_OF_PAGES_HALF) && (
          <>
            {currentPage !== totalPages - NUMBER_OF_PAGES + 1 && (
              <div
                className={classNames(
                  PAGE_CLASS_NAME,
                  'bg-lightOrange text-black'
                )}
              >
                ...
              </div>
            )}
            {renderPage(totalPages)}
          </>
        )}
      {/* totalPages > 1 && RenderArrow('right') */}
    </div>
  );
};

export default Pagination;
