import { useContext, useState } from 'react';
import { useFetch } from './useFetchHook';
import { Fsm } from '../context/Fsm';
import { ImageSrc } from '../utilts/SimpleFunction';

export const useFechItems = () => {
  const [itemsLoading, setItemsLoading] = useState(false);
  const { cardsData, setCardsData, itemsData, setItemsData } = useContext(Fsm);
  const { fetchData } = useFetch();
  const fetchItems = async (silent) => {
    if (!silent) setItemsLoading(true);
    const res = await fetchData('/all/getItems');
    if (!res) {
      setItemsLoading(false);
      setItemsData({
        isFetched: false,
        error: null,
        data: null,
      });
      return;
    }
    const datas = res.data;
    for (const data of datas) {
      data.imgUrl = await ImageSrc(data.imgUrl);
    }
    setItemsLoading(false);
    setItemsData({
      isFetched: true,
      error: null,
      data: datas,
    });
  };
  const fetchCards = async (silent) => {
    if (!silent) setItemsLoading(true);
    const res = await fetchData('/all/cards');
    if (!res) {
      setItemsLoading(false);
      setCardsData({
        isFetched: false,
        error: null,
        data: null,
      });
      return;
    }
    setItemsLoading(false);
    setCardsData({
      isFetched: true,
      error: null,
      data: res.data,
    });
  };
  const fetchFsm = async () => {
    if (!itemsLoading) fetchItems(true);
    if (!itemsData.isFetched) await fetchItems(false);
    if (!cardsData.isFetched) await fetchCards(false);
  };
  return { fetchItems, itemsLoading, fetchFsm, fetchCards };
};
