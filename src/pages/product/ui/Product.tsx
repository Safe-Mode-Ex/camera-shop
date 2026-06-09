import {useParams} from 'react-router-dom';
import {UpButton} from '@/shared/ui/button';
import {Breadcrumbs} from '@/widgets/breadcrumbs';
import {useProduct} from '../api/queries';
import ProductDetails from './product-details/ProductDetails';
import ProductSimilar from './product-similar/ProductSimilar';
import ProductReviews from './product-reviews/ProductReviews';

function Product() {
  const {id} = useParams();
  const {data: product} = useProduct(Number(id));

  if (!product) {
    return <main />;
  }

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs pageTitle={product.name} />

          <div className="page-content__section">
            <ProductDetails product={product} />
          </div>

          <div className="page-content__section">
            <ProductSimilar productId={id} />
          </div>

          <div className="page-content__section">
            <ProductReviews productId={id} />
          </div>
        </div>
      </main>

      <UpButton />
    </>
  );
}

export default Product;
