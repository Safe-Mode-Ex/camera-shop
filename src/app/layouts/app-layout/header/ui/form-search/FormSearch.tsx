import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {AppRoute} from '@/shared/enums';
import {Icon} from '@/shared/ui/icon';
import {useFormSearch} from '../../model';
import {useSearchListToggle} from '../../model/hooks';
import './FormSearch.css';

function FormSearch() {
  const {
    isListOpened,
    inputValue,
    handleInput,
    searchValue,
    products,
    handleSearchReset,
  } = useFormSearch();

  const {
    isListOpen,
    searchInputRef,
    handleOpenList,
    handleCloseList,
  } = useSearchListToggle();

  return (
    <div className={classNames('form-search', {'list-opened': isListOpened})}>
      <form ref={searchInputRef}>
        <label>
          <Icon className="form-search__icon" title="icon-lens" width="16" height="16" />
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={inputValue}
            onChange={handleInput}
            onFocus={handleOpenList}
          />
        </label>

        {searchValue && isListOpen && (
          <ul className="form-search__select-list">
            {products.map(({name, id}) => (
              <li key={id}>
                <Link
                  to={`${AppRoute.Catalog}/${id.toString()}`}
                  className="form-search__select-item"
                  onClick={handleCloseList}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>

      <button
        className="form-search__reset"
        type="reset"
        onClick={handleSearchReset}
      >
        <Icon title="icon-close" width="10" height="10" />
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;
