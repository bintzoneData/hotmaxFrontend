import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Rating, Button } from '@mui/material';
import { FaShareAlt } from 'react-icons/fa';
import { calculatePrice } from '../../utilts/SsimpleFunctions';
import { addToCart } from '../../hooks/useCartHook';

import { MainContext } from '../../context/MainContext';
function DetailsShow({ product, setMainImage, mainImage }) {
  return (
    <>
      <SectionOne
        name={product.name}
        warranty={product.warranty}
        brand={product.brand}
        // rating={product.rating}
      />
      <SectionTwo offer={product.offer} price={product.price} />
      <SectionThree
        imgurls={product.imgUrls}
        setMainImage={setMainImage}
        mainImage={mainImage}
        product_id={product._id}
      />
    </>
  );
}
const SectionOne = ({ name, warranty, brand }) => {
  return (
    <section className='flex shadow-bsh64b pb-3 flex-col gap-1 '>
      <h1 className='first-letter:capitalize text-2xl font-semibold'>{name}</h1>
      <Link className='text-[blue] underline' to='/'>
        <small>View more like this</small>
      </Link>
      <div className='flex gap-[10px] items-center'>
        <Rating style={{ fontSize: 18 }} className='shadow-bsh64r pr-2' />
        {parseInt(warranty) > 0 && (
          <div className='shadow-bsh64r capitalize pr-2'>
            {parseInt(warranty)} {parseInt(warranty) > 1 ? 'years' : 'year'}{' '}
            warranty
          </div>
        )}
        <div className='capitalize'>
          <span className='text-[gray] ca'>brand</span>: {brand}
        </div>
      </div>
    </section>
  );
};
const SectionTwo = ({ offer, price }) => {
  const offerPrice = calculatePrice(price, offer);
  return (
    <section className='flex mt-2 shadow-bsh64b pb-3 flex-col gap-1'>
      <div className='leading-[1.1rem]'>
        <h1 className='text-[20px]'>
          {parseInt(offer) > 0 && (
            <span className='bg-[red] px-[10px] py-[1px] text-white mr-2 text-[17px]'>
              -{offer}%
            </span>
          )}
          <span className='font-bold text-[25px]'>
            {offerPrice?.toLocaleString()}
          </span>
          <small className='text-[gray] ml-[1px] text-[10px]'>ksh</small>
        </h1>
        {parseInt(offer) > 0 && (
          <p className='text-[gray] pl-2 text-[10px]'>
            was <del>{price?.toLocaleString()}</del>
          </p>
        )}
      </div>
      <h2 className='text-[gray] h-[20px] first-letter:uppercase '>
        # return available in 7 days
      </h2>
    </section>
  );
};
const SectionThree = ({ imgurls, setMainImage, product_id }) => {
  const imgs =
    imgurls?.filter((item, index) => index < 3 && item.color !== 'n/a') || [];
  const { setSmallNotify } = useContext(MainContext);
  const onAdd = (id) => {
    const res = addToCart(id);
    if (!res.ok) {
      setSmallNotify({
        show: true,
        msg: res.msg,
        type: 'warn',
        time: 3000,
      });
      return;
    }
    setSmallNotify({
      show: true,
      msg: res.msg,
      type: 'success',
      time: 3000,
    });
  };
  return (
    <section className='flex pb-3 flex-col gap-2 pt-2'>
      {imgs.length > 0 && (
        <div className='flex flex-col gap-2'>
          <h1 className='text-[15px]'>
            <span className='text-[gray]'>color</span>:{/* bb */}
          </h1>
          <div className='flex gap-2'>
            {imgs?.map((item, index) => (
              <div
                key={index}
                onClick={() => setMainImage(item.img)}
                className={`bg-[${item.color}] h-[30px] w-[40px] shadow-bsh08 cursor-pointer hover:scale-110`}
              />
            ))}
          </div>
        </div>
      )}
      <div className='mt-[10px] flex md gap-1 max-mq-450:flex-col max-mq-450:gap-3'>
        <Button
          onClick={() => onAdd(product_id)}
          variant='contained'
          color='primary'
        >
          add to cart
        </Button>

        <div className='flex gap-2 '>
          <Button
            variant='outlined'
            className='max-mq-450:flex-1'
            color='primary'
          >
            request assistance
          </Button>
          <Button variant='outlined' color='primary'>
            <FaShareAlt />
          </Button>
        </div>
      </div>
    </section>
  );
};
export default DetailsShow;
