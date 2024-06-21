import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useFetch } from '../hooks/useFetchHook';
import { ImageSrc } from '../utilts/SimpleFunction';

const Fsm = createContext();

const FsmProvider = ({ children }) => {
  const { fetchPrivateData, fetchData } = useFetch();
  const [authInfo, setAuthInfo] = useState({
    isFeteched: false,
    error: null,
    data: null,
    isLoggedIn: false,
  });
  const [cardsData, setCardsData] = useState({
    isFetched: false,
    error: null,
    data: null,
  });
  const [mainDetails, setMainDetails] = useState({
    isFetched: false,
    error: null,
    data: null,
  });
  const [itemsData, setItemsData] = useState({
    isFetched: false,
    error: null,
    data: null,
  });
  const [orders, setOrders] = useState({
    isFeteched: false,
    error: null,
    data: null,
  });

  const [authLoading, setAuthLoading] = useState(false);
  const fetchAuthInfo = async () => {
    setAuthLoading(true);
    try {
      const res = await fetchPrivateData('/clients/me');
      if (!res.ok) {
        setAuthInfo({
          isFeteched: true,
          error: res.message,
          data: null,
          isLoggedIn: false,
        });
        return;
      }

      setAuthInfo({
        isFeteched: true,
        error: null,
        data: res.data,
        isLoggedIn: true,
      });
    } catch (error) {
      setAuthInfo({
        isFeteched: true,
        error: error.message,
        data: null,
        isLoggedIn: false,
      });
    } finally {
      setAuthLoading(false);
    }
  };
  const resetFsm = () => {
    setCardsData({
      isFetched: false,
      error: null,
      data: null,
    });

    setOrders({
      isFeteched: false,
      error: null,
      data: null,
    });
  };
  useEffect(() => {
    if (!authInfo.isFeteched) {
      fetchAuthInfo();
    }
  }, [authInfo]);

  return (
    <Fsm.Provider
      value={{
        authInfo,
        setAuthInfo,
        authLoading,
        setAuthLoading,
        mainDetails,
        setMainDetails,
        orders,
        setOrders,
        cardsData,
        setCardsData,
        resetFsm,
        itemsData,
        setItemsData,
      }}
    >
      {children}
    </Fsm.Provider>
  );
};

export { Fsm, FsmProvider };
