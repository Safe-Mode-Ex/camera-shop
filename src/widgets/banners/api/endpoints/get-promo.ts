import {httpApi} from '@/shared/api';
import {Domen} from '../../model/enums';
import type {PromoBanner} from '../../model/types';

export const getPromo = async () =>
  httpApi.get<PromoBanner[]>(Domen.Promo).then(({data}) => data);
