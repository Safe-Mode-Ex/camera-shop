import type {Product} from '@/shared/dto';

export interface CartItem {
  product: Product;
  quantity: number;
}
