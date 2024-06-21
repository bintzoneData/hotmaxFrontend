import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Image, Spin, Badge, Empty } from 'antd';
import { Button } from '@mui/material';
import { calculatePrice } from '../../../utilts/SsimpleFunctions';
import { socket } from '../../../App';
import CancelModal from './CancelModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fsm } from '../../../context/Fsm';
import { useFetch } from '../../../hooks/useFetchHook';
function Orders() {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(Fsm);
  const data = orders.data;

  const [errorForm, setErrorForm] = useState({
    type: '',
    msg: '',
  });
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    data: null,
  });
  const { postFetch, fetchLoading, fetchPrivateData } = useFetch();
  const onCancel = async () => {
    const res = await postFetch(
      `/orders/cancelMyOrder/${isModalOpen.data._id}`,
      'PUT',
      {}
    );
    if (!res.ok) {
      setErrorForm({ type: 'modal', msg: res.msg });
      return;
    }
    setIsModalOpen({ open: false, data: null });
  };
  const fetchQuietly = async () => {
    const res = await fetchPrivateData(`/orders/myOrders`);
    if (!res.ok) {
      return;
    }
    setOrders((prev) => ({ ...prev, data: res.data }));
  };
  useEffect(() => {
    socket.on('updateOrders', () => {
      fetchQuietly();
      console.log('clients updated');
    });
    // Clean up the event listener on component unmount
    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  if (orders && orders.data.length < 1) {
    return (
      <Empty
        className='mt-[100px]'
        description={<p className='text-[18px]'>No Orders have been placed</p>}
      />
    );
  }
  return (
    <div className='flex-1 h-[100%] bg-white p-[10px]  flex flex-col gap-5'>
      <CancelModal
        isModalOpen={isModalOpen.open}
        onClose={() => {
          setIsModalOpen({
            open: false,
            data: null,
          });
          setErrorForm({ type: '', msg: '' });
        }}
        errorForm={errorForm}
        isClientLoading={fetchLoading}
        show={`order id : ${isModalOpen.data?.uid}`}
        onClick={() => {
          setErrorForm({ type: '', msg: '' });
          onCancel();
        }}
      />
      {data.map((item) => (
        <Badge.Ribbon
          key={item._id}
          className='h-[25px] flex items-center cursor-pointer justify-center capitalize'
          text={<p className='text-[15px]'>{item.status}</p>}
          color={
            item.status === 'pending'
              ? '#ECCC04'
              : item.status === 'ongoing'
              ? '#04FC04'
              : item.status === 'completed'
              ? '#0484C9'
              : '#FC0404'
          }
        >
          <section className='shadow-bsh33 py-2 rounded-md  '>
            <section
              className='flex gap-2 cursor-pointer'
              onClick={() => {
                navigate(`/orders/${item._id}`);
              }}
            >
              <div className='w-[120px] min-mq-450:min-w-[100px] max-mq-450:min-w-[120px] h-[100px] flex justify-center items-center select-none shadow-bsh64r pr-2'>
                <Image
                  src={item.stocks[0].product.imgUrl}
                  preview={false}
                  width={'90%'}
                  placeholder={<Spin size='small' />}
                />
              </div>
              <div className=''>
                <h1 className='line-clamp-2 text-[20px] max-mq-450:text-[16px] mr-[60px] font-semibold capitalize'>
                  oder id: {item.uid}
                </h1>
                <div className='flex gap-5 mt-1  mb-2 items-center'>
                  <h2 className='flex font-bold shadow-bsh64r pr-3'>
                    {item.stocks.reduce((acc, item) => acc + item.quantity, 0)}x
                  </h2>
                  <h2 className='flex font-bold'>
                    {item.stocks
                      .reduce(
                        (acc, item) =>
                          acc +
                          item.quantity *
                            parseInt(calculatePrice(item.price, item.offer)),
                        0
                      )
                      .toLocaleString()}
                    <span className='text-[gray] text-[10px] self-center pl-[1px] pt-[4px]'>
                      ksh
                    </span>
                  </h2>
                </div>
                {/*  */}
                <div className='mt-1'>
                  <h2 className='text-[14px] capitalize mt-1 font-semibold  pt-2'>
                    {new Date(item.createdAt).toLocaleString('en-GB')}
                  </h2>
                </div>
              </div>
            </section>
            <div className='flex justify-between mx-2 shadow-bsh64t mt-2 h-[40px] '>
              <Button
                onClick={() => {
                  navigate(`/orders/${item._id}`);
                }}
                style={{
                  height: '30px',
                  marginTop: '10px',
                  zIndex: '70',
                  textTransform: 'capitalize',
                }}
                variant='contained'
                color='primary'
              >
                view details
              </Button>
              {['new', 'confirmation', 'processing'].includes(item.current) ? (
                <Button
                  onClick={() => {
                    setIsModalOpen({
                      open: true,
                      data: item,
                    });
                    setErrorForm({ type: '', msg: '' });
                  }}
                  style={{
                    height: '30px',
                    marginTop: '10px',
                    zIndex: '70',
                  }}
                  variant='outlined'
                  color='error'
                >
                  cancel
                </Button>
              ) : (
                <Button
                  style={{ height: '30px', marginTop: '10px', zIndex: '70' }}
                  variant='outlined'
                  color='secondary'
                >
                  ! help
                </Button>
              )}
            </div>
          </section>
        </Badge.Ribbon>
      ))}
    </div>
  );
}

export default Orders;
