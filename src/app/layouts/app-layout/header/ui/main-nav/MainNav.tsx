import classNames from 'classnames';
import {NavLink} from 'react-router';
import type {MainMavItem} from '../../model/types';
import './MainNav.css';

interface Props {
  links: MainMavItem[];
  className?: string;
}

function MainNav({links, className}: Props) {
  return (
    <nav
      className={classNames(
        'main-nav',
        className,
      )}
    >
      <ul className="main-nav__list">
        {links.map(({name, route}) => (
          <li key={name} className="main-nav__item">
            <NavLink
              className={({isActive}) =>
                classNames('main-nav__link', {'main-nav__link--active': isActive})}
              to={route}
            >{name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
