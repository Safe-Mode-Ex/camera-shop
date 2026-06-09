import {FooterNav, FooterInfo} from './components';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <FooterInfo />
        <FooterNav />
      </div>
    </footer>
  );
}

export default Footer;
