import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Empty, Image, Spin, Timeline } from 'antd';
import { calculatePrice } from '../../../utilts/SsimpleFunctions';
import { ClockCircleOutlined } from '@ant-design/icons';
import { FaBoxOpen, FaTimes, FaSpinner, FaUndo } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { Button } from '@mui/material';
import { Fsm } from '../../../context/Fsm';

function OrdersView() {
  const navigate = useNavigate();
  const { orders } = useContext(Fsm);
  const { id } = useParams();
  const data = orders.data.find((oder) => oder._id === id);
  console.log(data);
  if (!data || !orders.data) {
    return <Empty />;
  }
  let timeLine = [
    {
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>{`Order Placed on  ${new Date(
            data.createdAt
          ).toLocaleString('en-GB')}`}</p>
          <p className='text-[14px] text-gray-500'>
            Thank you for placing your order with us. We have received your
            order and will process it shortly.
          </p>
        </div>
      ),
    },
  ];
  if (data.stages.find((stage) => stage.name === 'confirmation')) {
    const stage = data.stages.find((stage) => stage.name === 'confirmation');
    timeLine.unshift({
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>{`Order Confirmation - ${new Date(
            stage.createdAt
          ).toLocaleString('en-GB')}`}</p>
          <p className='text-[14px] text-gray-500'>
            Your order is being processed. Please wait while we confirm your
            order. Thank you for your patience.
          </p>
        </div>
      ),
      dot: <ClockCircleOutlined className='text-[18px] text-[#1890ff]' />,
    });
  }
  if (data.stages.find((stage) => stage.name === 'processing')) {
    const stage = data.stages.find((stage) => stage.name === 'processing');
    timeLine.unshift({
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>
            {`Processing  - ${new Date(stage?.createdAt).toLocaleString(
              'en-GB'
            )}`}
          </p>
          <p className='text-[14px] text-gray-500'>
            Your order is confirmed, and we are now preparing it for you. Thank
            you for waiting
          </p>
        </div>
      ),
      dot: <FaSpinner className='text-[18px] text-[#1890ff]' />,
    });
  }
  if (data.stages.find((stage) => stage.name === 'shipped')) {
    const stage = data.stages.find((stage) => stage.name === 'shipped');
    timeLine.unshift({
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>
            {`Shipped  - ${new Date(stage?.createdAt).toLocaleString('en-GB')}`}
          </p>
          <p className='text-[14px] text-gray-500'>
            We have prepared your order, and it has now been shipped. Thank you
            for choosing us.
          </p>
        </div>
      ),
      dot: <TbTruckDelivery className='text-[24px] text-[#1890ff]' />,
    });
  }
  if (data.stages.find((stage) => stage.name === 'delivered')) {
    const stage = data.stages.find((stage) => stage.name === 'delivered');
    timeLine.unshift({
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>
            {`Delivered - ${new Date(stage?.createdAt).toLocaleString(
              'en-GB'
            )}`}
          </p>
          <p className='text-[14px] text-gray-500'>
            Your order has been delivered. We hope you enjoy your purchase.
            Thank you for choosing us!
          </p>
        </div>
      ),
      dot: <FaBoxOpen className='text-[24px] text-[#1890ff]' />,
    });
  }
  if (data.stages.find((stage) => stage.name === 'cancelled')) {
    const stage = data.stages.find((stage) => stage.name === 'cancelled');
    timeLine.unshift({
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>
            {`cancelled - ${new Date(stage?.createdAt).toLocaleString(
              'en-GB'
            )}`}
          </p>
          <p className='text-[14px] text-gray-500'>
            Your order has been cancelled.
          </p>
          <p className='text-[14px] text-gray-500'>
            reason:{' '}
            {stage?.isClientCancelled ? 'your cancellation' : stage?.message}
          </p>
        </div>
      ),
      dot: <FaTimes className='text-[24px] text-[red]' />,
    });
  }
  if (data.stages.find((stage) => stage.name === 'returned')) {
    const stage = data.stages.find((stage) => stage.name === 'returned');
    timeLine.unshift({
      children: (
        <div className='text-[16px] font-semibold capitalize'>
          <p className=''>
            {`Returned - ${new Date(stage?.createdAt).toLocaleString('en-GB')}`}
          </p>
          <p className='text-[14px] text-gray-500'>
            We have received the item you returned. Thank you for shopping with
            us.
          </p>
        </div>
      ),
      dot: <FaUndo className='text-[15px] text-[#1890ff]' />,
    });
  }

  return (
    <div className='bg-white h-full flex-1 p-[10px]'>
      <section className=''>
        <header className='flex justify-between '>
          <h1 className='text-[20px] bg-blue-400 text-white flex items-center h-[40px] font-semibold mb-[20px] ml-[-10px] px-3 w-fit rounded-r-lg '>
            Order Status
          </h1>
          <Button
            onClick={() => navigate('/orders')}
            variant='contained'
            sx={{
              height: '30px',
              textTransform: 'capitalize',
            }}
            color='primary'
          >
            back
          </Button>
        </header>

        {data.current === 'completed' &&
          new Date(data.confrimExpire) < new Date() && (
            <h3 className='mb-7 text-[14px]  font-semibold capitalize shadow-bsh08 px-2'>
              <span className=' text-red-500 text-[18px]'>NB: </span> click
              <span className='uppercase mx-2 text-blue-500'>
                Received Order
              </span>{' '}
              if you've received it. If not, contact us within 72 hours, or your
              order will be marked as received automatically.
            </h3>
          )}
        <Timeline items={timeLine} />
      </section>
      <section className=''>
        <h1 className='text-[20px] bg-blue-400 text-white flex items-center h-[40px] font-semibold mb-[20px] ml-[-10px] px-3 w-fit rounded-r-lg '>
          Order Details
        </h1>
        <ItemShow data={data} />
        <footer className='flex justify-end my-5'>
          <h2 className='border-b-[1px] pb-[3px] border-black '>
            total:
            <span className='font-bold ml-2 text-2xl'>
              ( {data.stocks.reduce((acc, item) => acc + item.quantity, 0)}x)
            </span>
            <span className='font-bold ml-2 text-2xl'>
              {data.stocks
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
            </span>
          </h2>
        </footer>
        {data.current === 'completed' &&
          new Date(data.confrimExpire) < new Date() && (
            <section className='flex justify-between gap-10'>
              <Button
                variant='outlined'
                color='primary'
                sx={{ textTransform: 'capitalize' }}
              >
                ! help
              </Button>
              <Button
                variant='contained'
                color='success'
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                Received Order
              </Button>
            </section>
          )}
      </section>
    </div>
  );
}
const ItemShow = ({ data }) => {
  return (
    <main className='shadow-bsh08 py-2 rounded-md  '>
      <Link
        to={`/products/${
          data.stocks[0].product.brand
        }/${data.stocks[0].product.name.replace(/\s/g, '-')}`}
        className='flex gap-4 cursor-pointer'
      >
        <div className='w-[120px] min-mq-450:min-w-[100px] max-mq-450:min-w-[120px] h-[100px] flex justify-center items-center select-none shadow-bsh64r pr-2'>
          <Image
            src={data.stocks[0].product.imgUrl}
            preview={false}
            width={'90%'}
            placeholder={<Spin size='small' />}
          />
        </div>
        <div className=''>
          <h1 className='line-clamp-2 text-[20px] max-mq-450:text-[16px] mr-[60px] font-semibold capitalize'>
            {data.stocks[0].product.name}
          </h1>
          <div className='flex gap-5 mt-1  mb-2 items-center'>
            <h2 className='flex font-bold shadow-bsh64r pr-3'>
              {data.stocks.reduce((acc, item) => acc + item.quantity, 0)}x
            </h2>
            <h2 className='flex font-bold'>
              {' '}
              {calculatePrice(
                data.stocks[0].product.price,
                data.stocks[0].offer
              ).toLocaleString()}
              <span className='text-[gray] text-[10px] self-center pl-[1px] pt-[4px]'>
                ksh
              </span>
            </h2>
          </div>
          {/*  */}
          <div className='mt-1'>
            <h2 className='text-[14px] capitalize mt-1 font-semibold  pt-2'>
              total:{' '}
              {data.stocks
                .reduce(
                  (acc, item) =>
                    acc +
                    item.quantity *
                      parseInt(calculatePrice(item.price, item.offer)),
                  0
                )
                .toLocaleString()}{' '}
              <span className='text-[gray] text-[10px] self-center pl-[1px] pt-[4px]'>
                ksh
              </span>
            </h2>
          </div>
        </div>
      </Link>
    </main>
  );
};
export default OrdersView;
