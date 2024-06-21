import ImagesShow from './ImagesShow';
import DetailsShow from './DetailsShow';
import AboutShow from './AboutShow';
import { useState } from 'react';

function OneProduct({ product }) {
  const [mainImage, setMainImage] = useState(null);
  if (!product) return null;
  return (
    <div className=' bg-white p-[10px]'>
      <section className='flex gap-3 max-mq-1000:flex-col '>
        <div className='first-letter:uppercase min-mq-1000:min-w-[350px] '>
          <ImagesShow
            imgUrl={product.imgUrl}
            imgUrls={product.imgUrls}
            setMainImage={setMainImage}
            mainImage={mainImage}
          />
        </div>
        <div className='p-[10px]'>
          <DetailsShow
            product={product}
            setMainImage={setMainImage}
            mainImage={mainImage}
          />
        </div>
      </section>
      <section>
        <AboutShow product={product} />
      </section>
    </div>
  );
}

export default OneProduct;
