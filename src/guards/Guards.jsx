import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Result, Spin } from 'antd';
import { Fsm } from '../context/Fsm';
import { useFetch } from '../hooks/useFetchHook';
import { Button } from '@mui/material';

export const AuthGuard = () => {
  const { authInfo, authLoading } = useContext(Fsm);
  if (authLoading) {
    return null;
  }

  return authInfo.isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
};
export const OrderGuard = () => {
  const { orders, setOrders } = useContext(Fsm);
  const { fetchPrivateData } = useFetch();
  const fetchOrders = async () => {
    const res = await fetchPrivateData(`/orders/myOrders`);
    if (!res.ok) {
      setOrders({
        data: null,
        isFetched: true,
        error: res.message,
      });
      return;
    }
    setOrders({
      data: res.data,
      isFetched: true,
      error: null,
    });
  };
  useEffect(() => {
    if (!orders.isFetched) {
      fetchOrders();
    }
  }, [orders]);
  if (!orders.isFetched) {
    return <Spin className='mt-5' />;
  }
  if (orders.error) {
    return (
      <Result
        status='500'
        subTitle={<p>{`cannot fetch orders! `}</p>}
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
    );
  }
  return <Outlet />;
};

export const LoginGuard = () => {
  const { authInfo, authLoading } = useContext(Fsm);
  if (authLoading) {
    return null;
  }
  return authInfo.isLoggedIn ? <Navigate to='/me' replace /> : <Outlet />;
};
