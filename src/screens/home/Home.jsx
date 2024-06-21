import { Fsm } from '@/context/Fsm';
import MainSpinner from '@/assets/spinners/MainSpinner';
import { useFetch } from '@/hooks/useFetchHook';
import { Result } from 'antd';
import BigBanner from './BigBanner/BigBanner';
import HomeBars from './HomeBars';
import SlideCards from './slideCard/SlideCards';
import TopBrands from './TopBrands';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { socket } from '@/App';
import { useFechItems } from '@/hooks/useFsmState';
import { ImageSrc } from '../../utilts/SimpleFunction';
const Home = () => {
  const { cardsData, setCardsData } = useContext(Fsm);
  const { fetchData, fetchPrivateData } = useFetch();
  const fetchCards = async () => {
    console.log('fetching cards...');
    await fetchData('/all/cards').then(async (res) => {
      if (!res.ok) {
        setCardsData({
          isFetched: true,
          error: res.message || 'could not fetch data',
          data: null,
        });
        return;
      }
      const bigBanners = res.data.bigBanners;
      for (const data of bigBanners) {
        data.imgUrl = await ImageSrc(data.imgUrl);
      }
      const topBrands = res.data.topBrands;
      for (const data of topBrands) {
        data.imgUrl = await ImageSrc(data.imgUrl);
      }
      const slideCards = res.data.slideCards;
      for (const data of slideCards) {
        data.imgUrl = await ImageSrc(data.imgUrl);
      }
      setCardsData({
        isFetched: true,
        error: null,
        data: {
          bigBanners: bigBanners,
          topBrands: topBrands,
          slideCards: slideCards,
        },
      });
    });
  };
  const fetchQuietly = async () => {
    const res = await fetchPrivateData('/all/cards');
    if (!res.ok) {
      return;
    }
    const bigBanners = res.data.bigBanners;
    for (const data of bigBanners) {
      data.imgUrl = await ImageSrc(data.imgUrl);
    }
    const topBrands = res.data.topBrands;
    for (const data of topBrands) {
      data.imgUrl = await ImageSrc(data.imgUrl);
    }
    const slideCards = res.data.slideCards;
    for (const data of slideCards) {
      data.imgUrl = await ImageSrc(data.imgUrl);
    }
    setCardsData((prev) => ({
      ...prev,
      data: {
        bigBanners: bigBanners,
        topBrands: topBrands,
        slideCards: slideCards,
      },
    }));
  };
  useEffect(() => {
    socket.on('updateBigBanners', () => {
      fetchQuietly();
      console.log('big banners updated');
    });
    // Clean up the event listener on component unmount
    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);
  useLayoutEffect(() => {
    if (!cardsData.isFetched) {
      fetchCards();
    }
  }, []);

  if (!cardsData.isFetched) {
    return <MainSpinner />;
  }
  if (cardsData.error) {
    return (
      <div className=''>
        <Navbar onClose={() => setOpen(!open)} name='Hotmax' />
        <Result
          status='500'
          subTitle={'server error! please refresh the page again'}
          extra={
            <Button
              onClick={() => window.location.reload()}
              variant='contained'
              type='primary'
            >
              refresh page
            </Button>
          }
        />
      </div>
    );
  }
  return (
    <div className='select-none   bg-white'>
      <Helmet>
        <title>HotMax - Top-Quality Electronics</title>
        <meta
          name='description'
          content='Free shipping on best electronic items. Discover top-quality electronics at HotMax. Shop for TVs, woofers, car audio systems, and more. Get the best deals and enhance your entertainment experience with our premium products.'
        />
        <meta
          name='keywords'
          content='electronics, TVs, woofers, car audio, HotMax, best deals, free shipping'
        />
        <meta property='og:title' content='HotMax - Top-Quality Electronics' />
        <meta
          property='og:description'
          content='Free shipping on best electronic items. Discover top-quality electronics at HotMax. Shop for TVs, woofers, car audio systems, and more. Get the best deals and enhance your entertainment experience with our premium products.'
        />
        <meta property='og:type' content='website' />
      </Helmet>
      <section className='hideHomeBar '>
        <HomeBars />
      </section>
      <div className=''>
        <SlideCards />
      </div>
      <div className=''>
        <BigBanner />
      </div>
      <div className=' flex justify-center w-[100%] '>
        <TopBrands />
      </div>
      {/* 
      <div className=' flex justify-center w-[100%] mt-[15px] '>
        <TradingProducts />
      </div>
      <div className=' flex justify-center w-[100%] mt-[15px] '>
        <ForYou />
      </div>
      <div className=' flex justify-center w-[100%] mt-[15px] '>
        <LatestProducts />
      </div>
      <div className=' flex justify-center w-[100%] mt-[15px] '>
        <MostSearched />
      </div> */}
    </div>
  );
};

export default Home;
