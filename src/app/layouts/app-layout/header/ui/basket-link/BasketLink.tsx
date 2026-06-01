import {Link} from 'react-router';
import {Icon} from '@/shared/ui/icon';

function BasketLink() {
  return (
    <Link className="header__basket-link" to="#">
      <Icon title="icon-basket" width="16" height="16" />
    </Link>
  );
}

export default BasketLink;
