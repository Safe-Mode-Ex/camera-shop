import {Banners} from '@/widgets/banners';
import Promocodes from './promocodes/Promocodes';

function Home() {
  return (
    <main>
      <Banners />

      <div className="page-content">
        <Promocodes />
      </div>
    </main>
  );
}

export default Home;
