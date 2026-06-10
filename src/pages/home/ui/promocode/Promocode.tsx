import type {MouseEvent} from 'react';
import './Promocode.css';
import PromocodeIcon from './promocode-icon/PromocodeIcon';

interface Props {
  title: string;
  discount: number;
  copied: string | null;
  onCopy: (text: string) => void;
}

function Promocode({title, discount, copied, onCopy}: Props) {
  const isInBuffer = copied === title;
  const handlePromocodeCopy = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    onCopy(title);
  };

  return (
    <article className="promocode">
      <button className="btn promocode__btn" type="button" onClick={handlePromocodeCopy}>
        <h3 className="promocode__title">{title}</h3>
        <p className="promocode__discount">Скидка: {discount}%</p>
        <PromocodeIcon isInBuffer={isInBuffer} />
      </button>
    </article>
  );
}

export default Promocode;
