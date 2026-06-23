import type {ChangeEvent, SubmitEvent} from 'react';
import {useState} from 'react';
import {InputType} from '@/shared/enums';
import {FilledButton} from '@/shared/ui/button';
import {CustomInput} from '@/shared/ui/input';
import {CustomTextarea} from '@/shared/ui/textarea';
import FormRate from './form-rate/FormRate';

function ReviewForm() {
  const [formValue, setFormValue] = useState({
    rating: 0,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {target} = evt;
    const {name, value} = target;

    setFormValue((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="form-review__rate">
          <FormRate name="rating" value={formValue.rating} onChange={handleInputChange} />

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Ваше имя"
            name="userName"
            value={formValue.userName}
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
            name="advantage"
            value={formValue.advantage}
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
            name="disadvantage"
            value={formValue.disadvantage}
            placeholder="Главные недостатки товара"
            required
            onChange={handleInputChange}
          >
            <CustomInput.Error>Нужно указать недостатки</CustomInput.Error>
          </CustomInput>

          <CustomTextarea
            className="form-review__item"
            label="Комментарий"
            name="review"
            value={formValue.review}
            minLength={5}
            placeholder="Поделитесь своим опытом покупки"
            error="Нужно добавить комментарий"
            onChange={handleInputChange}
          />
        </div>

        <FilledButton className="form-review__btn" type="submit">Отправить отзыв</FilledButton>
      </form>
    </div>
  );
}

export default ReviewForm;
