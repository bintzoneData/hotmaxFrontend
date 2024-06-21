import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

export const useInfo = () => {
  const { allData } = useContext(MainContext);

  return {
    slideCards: allData?.slideCards,
    categories: allData?.categories,
    brands: allData?.brands,
    topBrands: allData?.topBrands,
    categoryView: allData?.categoryView,
    items: allData?.items,
    bigBanners: allData?.bigBanners,
  };
};
