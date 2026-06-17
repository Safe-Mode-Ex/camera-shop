import {Link} from 'react-router-dom';
import type {PromoBanner} from '../../model/types';
import {PreviewImage} from '@/shared/ui/preview-image';
import {AppRoute} from '@/shared/enums';
import './Banner.css';

function Banner({
  previewImg,
  previewImg2x,
  previewImgWebp,
  previewImgWebp2x,
  name,
  id,
}: PromoBanner) {

  return (
    <div className="banner">
      <PreviewImage
        imageSource={{previewImg, previewImg2x, previewImgWebp, previewImgWebp2x}}
        width="1280"
        height="280"
        alt={name}
      />

      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Catalog}/${id.toString()}`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
