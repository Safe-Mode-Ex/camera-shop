import {Link} from 'react-router';
import {footerNavItems} from '@/app/model/data';

function FooterNav() {
  return (
    <ul className="footer__nav">
      {footerNavItems.map(({title, items}) => (
        <li key={title} className="footer__nav-item">
          <p className="footer__title">{title}</p>

          <ul className="footer__list">
            {items.map(({name, route}) => (
              <li key={name} className="footer__item">
                <Link className="link" to={route}>{name}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default FooterNav;
