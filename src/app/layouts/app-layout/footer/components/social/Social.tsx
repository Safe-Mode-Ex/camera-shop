import {Link} from 'react-router';
import {Icon} from '@/shared/ui/icon';
import './Social.css';

function Social() {
  return (
    <ul className="social">
      <li className="social__item">
        <Link className="link" to="#" aria-label="Переход на страницу вконтатке">
          <Icon title="icon-vk" width="20" height="20" />
        </Link>
      </li>
      <li className="social__item">
        <Link className="link" to="#" aria-label="Переход на страницу pinterest">
          <Icon title="icon-pinterest" width="20" height="20" />
        </Link>
      </li>
      <li className="social__item">
        <Link className="link" to="#" aria-label="Переход на страницу reddit">
          <Icon title="icon-reddit" width="20" height="20" />
        </Link>
      </li>
    </ul>
  );
}

export default Social;
