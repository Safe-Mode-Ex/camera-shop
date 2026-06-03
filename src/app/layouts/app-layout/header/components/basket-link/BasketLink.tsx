import {Link} from 'react-router';
import {useQuery} from '@tanstack/react-query';
import {AppRoute} from '@/shared/enums';
import {Icon} from '@/shared/ui/icon';
import {getCartLengthQuery} from '@/entities/cart-items';

function BasketLink() {
  const {data: cartLength} = useQuery(getCartLengthQuery);

  return (
    <Link className="header__basket-link" to={AppRoute.Cart}>
      <Icon title="icon-basket" width="16" height="16" />
      {Boolean(cartLength) && (
        <span className="header__basket-count">{cartLength}</span>
      )}
    </Link>
  );
}

export default BasketLink;
