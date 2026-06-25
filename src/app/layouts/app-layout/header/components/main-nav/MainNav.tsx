import {NavLink} from 'react-router';
import classNames from 'classnames';
import type {NavItem} from '@/app/model/types';
import './MainNav.css';

interface Props {
  links: NavItem[];
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
              end
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
