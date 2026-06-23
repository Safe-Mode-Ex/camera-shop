import {InputType} from '@/shared/enums';
import {FilledButton} from '@/shared/ui/button';
import {Icon} from '@/shared/ui/icon';
import {CustomInput} from '@/shared/ui/input';

function ReviewForm() {
  const handleInputChange = () => null;
  return (
    <div className="form-review">
      <form method="post">
        <div className="form-review__rate">
          <fieldset className="rate form-review__item">
            <legend className="rate__caption">Рейтинг
              <Icon title="#icon-snowflake" width="9" height="9" />
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
                <label className="rate__label" htmlFor="star-5" aria-label="Отлично" />
                <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
                <label className="rate__label" htmlFor="star-4" aria-label="Хорошо" />
                <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
                <label className="rate__label" htmlFor="star-3" aria-label="Нормально" />
                <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
                <label className="rate__label" htmlFor="star-2" aria-label="Плохо" />
                <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
                <label className="rate__label" htmlFor="star-1" aria-label="Ужасно" />
              </div>
              <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Ваше имя"
            name="user-name"
            placeholder="Введите ваше имя"
            required
            onChange={handleInputChange}
          >
            <CustomInput.Error>Нужно указать имя</CustomInput.Error>
          </CustomInput>

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Достоинства"
            name="user-plus"
            placeholder="Основные преимущества товара"
            required
            onChange={handleInputChange}
          >
            <CustomInput.Error>Нужно указать достоинства</CustomInput.Error>
          </CustomInput>

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Недостатки"
            name="user-minus"
            placeholder="Главные недостатки товара"
            required
            onChange={handleInputChange}
          >
            <CustomInput.Error>Нужно указать недостатки</CustomInput.Error>
          </CustomInput>

          <div className="custom-textarea form-review__item">
            <label>
              <span className="custom-textarea__label">Комментарий
                <Icon title="icon-snowflake" width="9" height="9" />
              </span>
              <textarea
                name="user-comment"
                minLength={5}
                placeholder="Поделитесь своим опытом покупки"
              />
            </label>
            <div className="custom-textarea__error">Нужно добавить комментарий</div>
          </div>
        </div>

        <FilledButton className="form-review__btn" type="submit">Отправить отзыв</FilledButton>
      </form>
    </div>
  );
}

export default ReviewForm;
