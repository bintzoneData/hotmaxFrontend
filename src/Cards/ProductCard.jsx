import { Image, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Rating from '@mui/material/Rating';
import { ImageSrc } from '../utilts/SimpleFunction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppTimeStamp, DomainApi } from '@/App.jsx';
import ImgSpin from '../shared/ImgSpin';

function ProductCard({ imgUrl, rating, price, desc, offer, name }) {
  const params = useParams();
  const [like, setLike] = useState(false);
  const offerPrice = (offer / 100) * price;
  const originalPrice = parseInt(price) + parseInt(offerPrice);
  const [imgData, setImgData] = useState(null);
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     setImgData(await ImageSrc(imgUrl));
  //   };
  //   fetchImage();
  // }, [imgUrl]);
  return (
    <div className='relative'>
      {/* like */}
      <div className='absolute right-2  cursor-pointer   flex items-center   text-[22px] h-[30px] z-10'>
        {like ? (
          <FaHeart className='text-mainColor' onClick={() => setLike(!like)} />
        ) : (
          <FaRegHeart onClick={() => setLike(!like)} />
        )}
      </div>
      <Link
        to={`/products/${params.type}/${name.replace(/\s/g, '-')}`}
        className='shadow-bsh08 pb-[5px]  rounded-sm cursor-pointer min-mq-450:hover:opacity-60   flex flex-col gap-[5px] overflow-hidden items-center  relative pCard'
      >
        <div className='flex self-start h-[30px] pt-2 px-2 items-center text-[25px]  '>
          <Rating
            name='read-only'
            style={{ fontSize: '18px' }}
            value={rating}
            readOnly
          />
        </div>

        {/* image */}
        <div className='flex items-center justify-center Pimage'>
          <Image
            // src={
            //   imgUrl.startsWith('http')
            //     ? imgUrl
            //     : `${DomainApi}${imgUrl}?v=${AppTimeStamp}`
            // }
            src={imgUrl && URL.createObjectURL(imgUrl)}
            placeholder={<ImgSpin />}
            width={'80%'}
            preview={false}
          />
        </div>
        {/* price and star count */}
        <div className='my-[5px] self-start flex justify-between items-center '>
          <section className='flex'>
            <div className='bg-[#5ad0ee] w-fit rounded-r-[2px]  px-[5px] text-white text-[16px] flex items-center h-[25px]'>
              {price.toLocaleString()}
              {offer > 0 && (
                <small className='flex flex-col justify-center ml-1 leading-[0.6rem] text-[8px]'>
                  was <del>{originalPrice.toLocaleString()}</del>
                </small>
              )}
            </div>
            {offer > 0 && (
              <div className='leading-[0.6rem] ml-1'>
                <p className='text-[09px] text-[red]'>{offer}% </p>
                <p className='text-[8px] text-[red]'>discount</p>
              </div>
            )}
          </section>
        </div>
        {/* desc */}
        <p className='text-[16px] px-2 h-[45px] line-clamp-2  first-letter:uppercase text-left w-full  select-none'>
          {name + ' ' + desc}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
