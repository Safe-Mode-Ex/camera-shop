import type {Product} from '@/shared/dto';
import {ProductCard} from '@/entities/product-cards';
import {useGetInCart} from '../../model/hooks';
import './CatalogCards.css';

interface Props {
  products: Product[];
}

function CatalogCards({products}: Props) {
  const getInCart = useGetInCart();

  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          inCart={getInCart(product.id)}
        />
      ))}
    </div>
  );
}

export default CatalogCards;
