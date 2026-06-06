import {Icon} from '@/shared/ui/icon';
import {SortOrder} from '@/pages/catalog/model/enums';
import type {SortOrderHandler} from '@/pages/catalog/model/types';

interface Props {
  order: SortOrder;
  onSortOrderChange: SortOrderHandler
}

function CatalogSortOrder({order, onSortOrderChange}: Props) {
  return (
    <div className="catalog-sort__order">
      <div className="catalog-sort__btn catalog-sort__btn--up">
        <input
          type="radio"
          id="up"
          name="sort-icon"
          value={SortOrder.Up}
          aria-label="По возрастанию"
          checked={order === SortOrder.Up}
          onChange={onSortOrderChange(SortOrder.Up)}
        />
        <label htmlFor="up">
          <Icon title="icon-sort" width="16" height="14" />
        </label>
      </div>

      <div className="catalog-sort__btn catalog-sort__btn--down">
        <input
          type="radio"
          id="down"
          name="sort-icon"
          value={SortOrder.Down}
          aria-label="По убыванию"
          checked={order === SortOrder.Down}
          onChange={onSortOrderChange(SortOrder.Down)}
        />
        <label htmlFor="down">
          <Icon title="icon-sort" width="16" height="14" />
        </label>
      </div>
    </div>
  );
}

export default CatalogSortOrder;
