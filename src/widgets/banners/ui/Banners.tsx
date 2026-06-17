import {useQuery} from '@tanstack/react-query';
import {Swiper, SwiperSlide} from 'swiper/react';
import {BANNERS_SLIDER_OPTIONS} from '../model/config';
import {getPromoQuery} from '../api/queries';
import Banner from './banner/Banner';
import './Banners.css';

function Banners() {
  const {data: banners} = useQuery(getPromoQuery);

  return banners && (
    <aside className="banners">
      <h2 className="visually-hidden">Рекламные баннеры</h2>

      <Swiper {...BANNERS_SLIDER_OPTIONS}>
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Banner {...banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </aside>
  );
}

export default Banners;
