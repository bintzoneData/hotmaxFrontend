import React, { useContext } from 'react';
import { Image } from 'antd';
import hassan from '@/assets/LB1.webp';
import photo2 from '@/assets/mainImage2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { DomainApi, AppTimeStamp } from '@/App.jsx';
import { useInfo } from '../../../hooks/useInfoHook';
import { useNavigate } from 'react-router-dom';
import { Fsm } from '../../../context/Fsm';
function BigBanner() {
  const navigate = useNavigate();
  const { cardsData } = useContext(Fsm);
  const data = cardsData.data.bigBanners;
  const leftBanners = data.find((banner) => banner.type === 'left');
  const rightBanners = data.filter((banner) => banner.type === 'right');
  const centerBanners = data.filter((banner) => banner.type === 'center');
  return (
    <div className='p-2 flex gap-2'>
      {/* left */}
      <section className='min-mq-800:hidden shadow-bsh33  basis-1/4 '>
        <Swiper
          slidesPerView='auto'
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {leftBanners && (
            <SwiperSlide>
              <Image
                width='100%'
                height='100%'
                preview={false}
                quality={100}
                src={leftBanners && URL.createObjectURL(leftBanners.imgUrl)}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </section>
      {/* center */}
      <section className='max-mq-800:basis-3/4 shadow-bsh33 rounded-sm max-h-[345px]'>
        <Swiper
          slidesPerView='auto'
          spaceBetween={10}
          modules={[Pagination, Autoplay, Navigation]}
          navigation
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
        >
          {centerBanners.map((banner) => (
            <SwiperSlide
              key={banner._id}
              className='cursor-pointer'
              onClick={() => navigate(banner.linkUrl)}
            >
              <Image
                width='100%'
                height='100%'
                preview={false}
                // src={
                //   banner && banner.imgUrl && URL.createObjectURL(banner.imgUrl)
                // }
                src={
                  banner && banner.imgUrl && URL.createObjectURL(banner.imgUrl)
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className='min-mq-800:hidden shadow-bsh08 basis-1/4'>
        <Swiper
          slidesPerView='auto'
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {rightBanners.map((banner) => (
            <SwiperSlide
              key={banner._id}
              className='cursor-pointer'
              onClick={() => navigate(banner.linkUrl)}
            >
              <Image
                width='100%'
                preview={false}
                src={
                  banner && banner.imgUrl && URL.createObjectURL(banner.imgUrl)
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default BigBanner;
