import {useCopyToClipboard} from 'usehooks-ts';
import {promocodes} from '../../model/data';
import Promocode from '../promocode/Promocode';
import './Promocodes.css';

function Promocodes() {
  const [copied, copy] = useCopyToClipboard();

  const onCopy = (text: string): void => {
    void copy(text);
  };

  return (
    <section className="promocodes">
      <div className="container">
        <h2 className="title title--h2">Промокоды</h2>

        <p>В честь белой пятницы и лампового понедельника</p>

        <ul className="promocodes__list">
          {promocodes.map(({title, discount}) => (
            <li key={title} className="promocodes__item">
              <Promocode
                title={title}
                discount={discount}
                copied={copied}
                onCopy={onCopy}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Promocodes;
