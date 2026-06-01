import {Logo} from '@/shared/ui/logo';
import {MainNav, FormSearch, BasketLink} from './ui';
import {mainNavItems} from './model';
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
