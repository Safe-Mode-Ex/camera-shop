import classNames from 'classnames';
import {usePages} from '../../model/hooks';
import './CatalogPagination.css';

interface Props {
  currentPage: number;
  pagesCount: number;
  changePage: (page: number) => void;
}

function CatalogPagination({currentPage, pagesCount, changePage}: Props) {
  const {
    currentPages,
    isBackItemShown,
    isFurtherItemShown,
    getPrevPage,
    getNextPage,
    handlePageChange,
    handleBackItemClick,
    handleNextItemClick,
  } = usePages(currentPage, pagesCount, changePage);

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {isBackItemShown &&
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              href={getPrevPage().toString()}
              onClick={handleBackItemClick}
            >Назад
            </a>
          </li>}

        {currentPages.map((page) => (
          <li key={page} className="pagination__item">
            <a
              className={classNames(
                'pagination__link',
                {'pagination__link--active': currentPage === page},
              )}
              href={page.toString()}
              onClick={handlePageChange(page)}
            >{page}
            </a>
          </li>
        ))}

        {isFurtherItemShown &&
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              href={getNextPage().toString()}
              onClick={handleNextItemClick}
            >Далее
            </a>
          </li>}
      </ul>
    </div>
  );
}

export default CatalogPagination;
