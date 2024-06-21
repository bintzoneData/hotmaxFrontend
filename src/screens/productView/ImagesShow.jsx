import { Image, Spin } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ImgSpin from '../../shared/ImgSpin';
import { AppTimeStamp, DomainApi } from '@/App.jsx';
function ImagesShow({ imgUrl, imgUrls, setMainImage, mainImage }) {
  const imgs = imgUrls?.filter((item, index) => index < 3) || [];
  imgs.unshift({
    img: imgUrl,
    color: 'n/a',
    uid: uuidv4(),
  });

  return (
    <div className='flex p-[10px]  gap-3'>
      <section className='select-none  shadow-bsh08 w-fit h-fit px-[5px] flex flex-col gap-[10px]'>
        {imgs?.map((item, index) => (
          <ImageList
            imgUrl={item.img}
            onClick={() => setMainImage(item.img)}
            key={index}
          />
        ))}
      </section>
      <section className='flex-1 h-[300px] flex justify-center  '>
        <div className='max-w-[300px]  h-[300px]   flex-1 '>
          <Image
            // src={
            //   imgUrl && imgUrl.startsWith('http')
            //     ? imgUrl
            //     : `${DomainApi}${imgUrl}?v=${AppTimeStamp}`
            // }
            src={imgUrl && URL.createObjectURL(imgUrl)}
            width={'100%'}
            placeholder={<ImgSpin />}
          />
        </div>
      </section>
    </div>
  );
}

const ImageList = ({ imgUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='w-[50px] hover:scale-110 h-[60px]  shadow-bsh64b cursor-pointer last:shadow-none flex items-center justify-center '
    >
      <Image
        src={imgUrl && URL.createObjectURL(imgUrl)}
        preview={false}
        placeholder={<ImgSpin />}
        width={'100%'}
      />
    </div>
  );
};
export default ImagesShow;
