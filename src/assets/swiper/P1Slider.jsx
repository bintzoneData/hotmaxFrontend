// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Spin } from 'antd';
import { Image } from 'antd';
import { AppTimeStamp, DomainApi } from '@/App.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { MdOutlineImageNotSupported } from 'react-icons/md';
// import required modules
import { Autoplay } from 'swiper/modules';
import ImgSpin from '../../shared/ImgSpin';

export default function P1Slider({ data }) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className='max-w-[170px]'>
            <main className='flex flex-col items-center justify-center h-[100%] '>
              {/* center things */}
              <section className='min-mq-450:hover:opacity-60 p-1 w-[170px] flex flex-col cursor-pointer justify-center items-center'>
                {/* ?image */}
                <div className='shadow-bsh33 rounded-lg w-[150px] h-[100px] flex items-center justify-center overflow-hidden'>
                  {!item.imgUrl ? (
                    <MdOutlineImageNotSupported className='text-6xl' />
                  ) : (
                    <div className='flex items-center justify-center '>
                      <Image
                        preview={false}
                        width={'70%'}
                        // src={
                        //   item.imgUrl.startsWith('http')
                        //     ? item.imgUrl
                        //     : `${DomainApi}${item.imgUrl}?v=${AppTimeStamp}`
                        // }
                        src={
                          item &&
                          item.imgUrl &&
                          URL.createObjectURL(item.imgUrl)
                        }
                        className='object-contain max-w-full max-h-full Z-9'
                        alt={'image'}
                        placeholder={<ImgSpin />}
                      />
                    </div>
                  )}
                </div>

                {/* names */}
                <div className='leading-[1.1rem] flex flex-col justify-center h-[35px] text-center  mt-2'>
                  <h1 className='text-1xl capitalize text-mainColor font-bold  select-none'>
                    {item.name}
                  </h1>
                </div>
              </section>
            </main>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
