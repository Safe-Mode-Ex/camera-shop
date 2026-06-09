import {Logo} from '@/shared/ui/logo';
import {mainNavItems} from '../../../model/data';
import {MainNav, FormSearch, BasketLink} from './components';
import './Header.css';

function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo className="header__logo" />
        <MainNav className="header__main-nav" links={mainNavItems} />
        <FormSearch />
        <BasketLink />
      </div>
    </header>
  );
}

export default Header;
