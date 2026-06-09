import {Logo} from '@/shared/ui/logo';
import Social from '../social/Social';

function FooterInfo() {
  return (
    <div className="footer__info">
      <Logo className="footer__logo" isMono />
      <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
      <Social />
    </div>
  );
}

export default FooterInfo;
