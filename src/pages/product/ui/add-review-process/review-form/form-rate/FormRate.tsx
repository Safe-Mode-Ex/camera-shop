import {Fragment, type ChangeEventHandler} from 'react';
import {Icon} from '@/shared/ui/icon';
import {RateProxy} from '@/shared/ui/rate-proxy';
import classNames from 'classnames';
import {RatingLabel, ReviewValueLength} from '@/pages/product/model/enums';

interface Props {
  name: string;
  value: string;
  onChange: ChangeEventHandler;
  className?: string;
  error?: string;
}

function FormRate({name, value, onChange, className, error}: Props) {
  return (
    <RateProxy>
      <fieldset
        className={classNames(
          'rate',
          className,
          {'is-invalid': error},
        )}
      >
        <legend className="rate__caption">
          Рейтинг
          <Icon title="icon-snowflake" width="9" height="9" />
        </legend>
        <div className="rate__bar">
          <div className="rate__group">
            {Array.from({length: ReviewValueLength.RatingMax}).map((_, index, array) => {
              const order = array.length - index;
              const orderString = order.toString();
              const id = `star-${orderString}`;

              return (
                <Fragment key={order}>
                  <input
                    className="visually-hidden"
                    id={id}
                    name={name}
                    type="radio"
                    value={order}
                    checked={value === orderString}
                    onChange={onChange}
                  />
                  <label className="rate__label" htmlFor={id} aria-label={RatingLabel[order]} />
                </Fragment>
              );
            })}
          </div>
          <div className="rate__progress">
            <span className="rate__stars">{value}</span>&nbsp;
            <span>/</span>&nbsp;
            <span className="rate__all-stars">5</span>
          </div>
        </div>
        <p className="rate__message">{error}</p>
      </fieldset>
    </RateProxy>
  );
}

export default FormRate;
