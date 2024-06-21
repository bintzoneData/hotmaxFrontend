import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Button, Drawer } from '@mui/material';
import Bar from '@/components/Bar';
import './App.css';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { MainContext } from './context/MainContext';
import SmallBar from './assets/notity/SmallBar';
export const DomainApi = import.meta.env.VITE_DOMAINAPI;
export const AppTimeStamp = new Date().getTime();
import { io } from 'socket.io-client';
import { useFetch } from './hooks/useFetchHook';
import { Fsm } from './context/Fsm';
import { Result } from 'antd';
import { useFechItems } from './hooks/useFsmState';

export const socket = io(`${import.meta.env.VITE_DOMAINAPI}`);
export default function App() {
  const { mainDetails, setMainDetails, itemsData, cardsData, setItemsData } =
    useContext(Fsm);
  const { fetchItems, fetchCards } = useFechItems();
  const { fetchData } = useFetch();
  const fetchMainDetails = async () => {
    const res = await fetchData(`/all/mainDetails`);
    if (!res.ok) {
      setMainDetails({
        isFetched: true,
        error: res.message,
        data: null,
      });
      return;
    }
    setMainDetails({
      isFetched: true,
      error: null,
      data: res.data,
    });
  };
  useEffect(() => {
    if (!mainDetails.isFetched) {
      fetchMainDetails();
    }
  }, [mainDetails]);

  useLayoutEffect(() => {
    if (!itemsData.isFetched) {
    }
  }, [cardsData]);
  if (!mainDetails.isFetched) return null;
  if (mainDetails.error) {
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
    <>
      <Children />
    </>
  );
}

function Children() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col min-h-[100dvh] justify-center relative '>
        <ScrollRestoration />
        <div className='fixed z-[1000] top-2 flex justify-center w-full'>
          <SmallBar />
        </div>
        <nav className='sticky w-full top-0 z-40'>
          <Navbar onClose={() => setOpen(!open)} name='Hotmax' />
          <Drawer
            PaperProps={{
              style: {
                backgroundColor: 'white', // Change this to your desired background color
              },
            }}
            open={open}
            onClose={() => setOpen(!open)}
          >
            <Bar onClose={() => setOpen(!open)} />
          </Drawer>
        </nav>
        <main className='flex-1 w-[100%] flex flex-col  homeSize'>
          <Outlet />
        </main>
        <footer onClick={() => navigate(`/`)} className=''>
          im footer
        </footer>
      </div>
    </>
  );
}
