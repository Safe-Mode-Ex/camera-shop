import {useQuery} from '@tanstack/react-query';
import Banner from './banner/Banner';
import {getPromoQuery} from '../api/queries';

function Banners() {
  const {data: banners} = useQuery(getPromoQuery);

  return banners && (
    <aside className="banners">
      <h2 className="visually-hidden">Рекламные баннеры</h2>

      {banners.map((banner) => (
        <Banner key={banner.id} {...banner} />
      ))}
    </aside>
  );
}

export default Banners;
