import {useQuery} from '@tanstack/react-query';
import {Swiper, SwiperSlide} from 'swiper/react';
import {SliderProxy} from '@/shared/ui/slider-proxy';
import {BANNERS_SLIDER_OPTIONS} from '../model/config';
import {getPromoQuery} from '../api/queries';
import Banner from './banner/Banner';
import './Banners.css';

function Banners() {
  const {data: banners} = useQuery(getPromoQuery);

  return banners && (
    <aside className="banners">
      <h2 className="visually-hidden">Рекламные баннеры</h2>

      <SliderProxy>
        <Swiper {...BANNERS_SLIDER_OPTIONS}>
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Banner {...banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderProxy>
    </aside>
  );
}

export default Banners;
