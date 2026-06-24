import type {ChangeEvent, FocusEvent, SubmitEvent} from 'react';
import {useState} from 'react';
import {InputType} from '@/shared/enums';
import {FilledButton} from '@/shared/ui/button';
import {CustomInput} from '@/shared/ui/input';
import {CustomTextarea} from '@/shared/ui/textarea';
import {INITIAL_REVIEW_FORM_VALUE} from '@/pages/product/model/config';
import {useValidateReviewForm} from '@/pages/product/model/hooks';
import FormRate from './form-rate/FormRate';
import {noop} from 'es-toolkit/function';

function ReviewForm() {
  const [formValue, setFormValue] = useState(INITIAL_REVIEW_FORM_VALUE);
  const {isSuccess, validationError, validatedState, validate} = useValidateReviewForm(formValue);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {target} = evt;
    const {name, value} = target;

    setFormValue((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleInputBlur = ({target}: FocusEvent<HTMLInputElement>) => {
    const {name} = target;
    if (!validatedState[name]) {
      return;
    }

    validate(name);
  };

  const handleFormSubmit = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    validate();

    if (!isSuccess) {
      return;
    }

    noop();
  };

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleFormSubmit} noValidate>
        <div className="form-review__rate">
          <FormRate
            className="form-review__item"
            name="rating"
            value={formValue.rating}
            onChange={handleInputChange}
            error={validationError.rating}
          />

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Ваше имя"
            name="userName"
            value={formValue.userName}
            placeholder="Введите ваше имя"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={validationError.userName}
            required
          >
            <CustomInput.Error>{validationError.userName}</CustomInput.Error>
          </CustomInput>

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Достоинства"
            name="advantage"
            value={formValue.advantage}
            placeholder="Основные преимущества товара"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={validationError.advantage}
            required
          >
            <CustomInput.Error>{validationError.advantage}</CustomInput.Error>
          </CustomInput>

          <CustomInput
            className="form-review__item"
            type={InputType.text}
            label="Недостатки"
            name="disadvantage"
            value={formValue.disadvantage}
            placeholder="Главные недостатки товара"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={validationError.disadvantage}
            required
          >
            <CustomInput.Error>{validationError.disadvantage}</CustomInput.Error>
          </CustomInput>

          <CustomTextarea
            className="form-review__item"
            label="Комментарий"
            name="review"
            value={formValue.review}
            minLength={5}
            placeholder="Поделитесь своим опытом покупки"
            error={validationError.review}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            required
          />
        </div>

        <FilledButton className="form-review__btn" type="submit">Отправить отзыв</FilledButton>
      </form>
    </div>
  );
}

export default ReviewForm;
