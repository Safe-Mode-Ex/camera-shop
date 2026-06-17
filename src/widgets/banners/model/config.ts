import {A11y, Autoplay, Pagination} from 'swiper/modules';
import type {SwiperOptions} from 'swiper/types';

export const BANNERS_SLIDER_OPTIONS: SwiperOptions = {
  modules: [Pagination, Autoplay, A11y],
  a11y: true,
  loop: true,
  speed: 2500,
  autoplay: {pauseOnMouseEnter: true},
  pagination: {
    clickable: true,
    modifierClass: 'banners__pagination--',
    bulletClass: 'banners__bullet',
    bulletActiveClass: 'banners__bullet--active',
  },
};
