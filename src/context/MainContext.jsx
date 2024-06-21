// MainContext.js
import React, { createContext, useEffect, useState } from 'react';
// Create a new context
const MainContext = createContext();

// Create a provider component
const MainProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState(null);
  const [error, setError] = useState(false);
  const [smallNotify, setSmallNotify] = useState({
    msg: '',
    type: 'success',
    show: false,
    time: 3000,
  });
  const setAuth = (data) => {
    setAllData({
      slideCards: data?.slideCards,
      categories: data?.categories,
      brands: data?.brands,
      topBrands: data?.topBrands,
      categoryView: data?.categoryView,
      items: data?.items,
      bigBanners: data?.bigBanners,
    });
  };
  const fetchData = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/all`);
      if (response.ok) {
        const data = await response.json();
        setAuth(data);
        //
      } else {
        setError(true);
        setAuth({});
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContext.Provider
      value={{
        isLoading,
        allData,
        error,
        smallNotify,
        setSmallNotify,
        setAuth,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// Export the context
export { MainContext, MainProvider };
