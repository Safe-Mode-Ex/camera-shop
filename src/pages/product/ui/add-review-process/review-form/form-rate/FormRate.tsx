import type {ChangeEventHandler} from 'react';
import {Icon} from '@/shared/ui/icon';

interface Props {
  name: string;
  value: number;
  onChange: ChangeEventHandler;
}

function FormRate({name, value, onChange}: Props) {
  return (
    <fieldset className="rate form-review__item">
      <legend className="rate__caption">
        Рейтинг
        <Icon title="icon-snowflake" width="9" height="9" />
      </legend>
      <div className="rate__bar">
        <div className="rate__group">
          <input className="visually-hidden" id="star-5" name={name} type="radio" value="5" checked={value === 5} onChange={onChange} />
          <label className="rate__label" htmlFor="star-5" aria-label="Отлично" />
          <input className="visually-hidden" id="star-4" name={name} type="radio" value="4" checked={value === 4} onChange={onChange} />
          <label className="rate__label" htmlFor="star-4" aria-label="Хорошо" />
          <input className="visually-hidden" id="star-3" name={name} type="radio" value="3" checked={value === 3} onChange={onChange} />
          <label className="rate__label" htmlFor="star-3" aria-label="Нормально" />
          <input className="visually-hidden" id="star-2" name={name} type="radio" value="2" checked={value === 2} onChange={onChange} />
          <label className="rate__label" htmlFor="star-2" aria-label="Плохо" />
          <input className="visually-hidden" id="star-1" name={name} type="radio" value="1" checked={value === 1} onChange={onChange} />
          <label className="rate__label" htmlFor="star-1" aria-label="Ужасно" />
        </div>
        <div className="rate__progress">
          <span className="rate__stars">0</span>&nbsp;
          <span>/</span>&nbsp;
          <span className="rate__all-stars">5</span>
        </div>
      </div>
      <p className="rate__message">Нужно оценить товар</p>
    </fieldset>
  );
}

export default FormRate;
