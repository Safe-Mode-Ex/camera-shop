import type {Sort, SortTypeHandler, SortOrderHandler} from '../../model/types';
import CatalogSortOrder from './catalog-sort-order/CatalogSortOrder';
import CatalogSortType from './catalog-sort-type/CatalogSortType';
import './CatalogSort.css';

interface Props {
  sort: Sort;
  onSortTypeChange: SortTypeHandler;
  onSortOrderChange: SortOrderHandler;
}

function CatalogSort({sort, onSortTypeChange, onSortOrderChange}: Props) {
  const {type, order} = sort;
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <CatalogSortType type={type} onSortChange={onSortTypeChange} />
          <CatalogSortOrder order={order} onSortOrderChange={onSortOrderChange} />
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
