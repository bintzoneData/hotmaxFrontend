import { Empty, Image, Result, Spin } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Button } from '@mui/material';
import { useInfo } from '../../hooks/useInfoHook';
import { calculatePrice } from '../../utilts/SsimpleFunctions';
import { MainContext } from '../../context/MainContext';
import PlaceModal from './PlaceModal';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetchHook';
import { Fsm } from '../../context/Fsm';
import { ImageSrc } from '../../utilts/SimpleFunction';
function ShopingCart() {
  const { itemsData } = useContext(Fsm);
  const { fetchData } = useFetch();
  const [items, setItems] = useState([]);
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : [];
  const [errorPage, setErrorPage] = useState({ isError: false, type: null });
  const navigate = useNavigate();
  const {} = useContext(MainContext);
  const [data, setData] = useState([]);
  const { setSmallNotify } = useContext(MainContext);
  const { postFetch, fetchLoading } = useFetch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sumOfQuantities = data.reduce((acc, item) => acc + item.quantity, 0);
  const onPlace = async () => {
    const datas = data.map((item) => {
      return { product: item._id, quantity: item.quantity };
    });
    if (datas.length > 0) {
      const res = await postFetch('/orders/place', 'POST', {
        items: datas,
      });
      if (!res.ok) {
        setSmallNotify({
          show: true,
          msg: res.msg || 'something went wrong',
          type: 'error',
          time: 3000,
        });
        return;
      }
      localStorage.removeItem('cart');
      navigate('/orders');
    }
  };
  useLayoutEffect(() => {
    if (!cart || cart.length < 1) {
      setErrorPage({
        isError: true,
        type: {
          code: 404,
          message: 'you dont have any items in your cart',
        },
      });
      return;
    }
    if (!itemsData.isFetched) {
      const query = encodeURIComponent(JSON.stringify(cart));
      const getData = async () => {
        const res = await fetchData(`/all/getItems?ids=${query}`);

        if (!res.ok) {
          setErrorPage({
            isError: true,
            type: {
              code: 500,
              message: 'server error or something went wrong',
            },
          });
          return;
        }
        if (res.data.length < 1) {
          setErrorPage({
            isError: true,
            type: {
              code: 404,
              message: 'cant display cart items! server error',
            },
          });
          return;
        }
        const newData = res.data;
        for (const data of newData) {
          data.imgUrl = await ImageSrc(data.imgUrl);
          data.quantity = 1;
        }
        setData(newData);
      };
      getData();
    } else {
      const idQueries = cart.map((obj) => obj.id).filter((id) => id);
      let cartDatas = [];
      for (const item of itemsData.data) {
        if (idQueries.includes(item._id)) {
          cartDatas.push({
            ...item,
            quantity: 1,
          });
        }
      }

      setData(cartDatas);
    }
  }, []);
  if (errorPage.isError) {
    return (
      <Result
        status={errorPage.type.code}
        title={
          <p className='text-[18px] text-[gray] capitalize'>
            {errorPage.type.message}
          </p>
        }
        extra={
          <Button
            onClick={() => {
              errorPage.type.code === 404
                ? navigate('/')
                : window.location.reload();
            }}
            variant='contained'
            type='primary'
          >
            {errorPage.type.code === 404 ? 'go home' : 'refresh page'}
          </Button>
        }
      />
    );
  }
  if (data.length < 1) {
    return (
      <Empty
        className='mt-[100px]'
        description={<p className='text-[18px]'>Your cart is empty</p>}
      />
    );
  }

  return (
    <div className='p-[10px] pt-[20px] pb-[40px] flex flex-col gap-[10px]  bg-white '>
      <PlaceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onPlace={onPlace}
        data={data}
        isClientLoading={fetchLoading}
      />
      <TitleComponent name='Shopping Cart' />
      {data.map((item, index) => (
        <div key={item._id} className='flex shadow-bsh64b pb-3  gap-4'>
          <ImageShow imgUrl={item.imgUrl} preview={false} />
          <section className='flex flex-col gap-2 w-full'>
            <ItemDetails
              item={item.name}
              price={item.price}
              offer={item.offer}
              isAvailable={item.isAvailable}
              quantity={item.quantity}
            />
            <div className='flex gap-4'>
              <div className='flex flex-col items-center gap-2 shadow-bsh64r pr-2'>
                <p className=' px-2'>color</p>
                <div className={`bg-[red] h-[25px] w-[25px] shadow-bsh08`} />
              </div>
              <div className='flex flex-col items-center gap-2'>
                <p className=' px-2'>quantity</p>
                <QuantityGenerator
                  setData={setData}
                  _id={item._id}
                  data={data}
                  qyt={Number(item.quantity)}
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <p className=''>
                total:<span className='font-bold mx-2'>({item.quantity}x)</span>{' '}
              </p>
              <h2 className='flex font-bold'>
                {parseInt(
                  calculatePrice(item.price, item.offer)
                ).toLocaleString()}
                <span className='text-[gray] text-[10px] self-center pl-[1px] pt-[4px]'>
                  ksh
                </span>
              </h2>
            </div>
          </section>
        </div>
      ))}
      <footer className='flex flex-col gap-3 items-end '>
        <div className=' flex mr-4 gap-3'>
          <h1 className='font-bold capitalize text-2xl'>
            total ({sumOfQuantities} {sumOfQuantities > 1 ? 'items' : 'item'} ):
          </h1>
          <h1 className='font-bold capitalize text-2xl'>
            {data
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
          </h1>
        </div>
        <div className='flex  mr-4'>
          <Button
            variant='contained'
            disabled={data.length < 1}
            onClick={() => {
              if (data.length > 0) {
                setIsModalOpen(true);
              }
            }}
          >
            checkout
          </Button>
        </div>
      </footer>
    </div>
  );
}

const TitleComponent = ({ name }) => {
  return <h1 className='text-[20px] font-bold pb-2 shadow-bsh64b '>{name}</h1>;
};

const ImageShow = ({ imgUrl }) => {
  return (
    <div className='w-[150px] min-mq-450:min-w-[150px] max-mq-450:min-w-[100px] flex justify-center items-center select-none shadow-bsh64r pr-2'>
      <Image
        src={imgUrl && URL.createObjectURL(imgUrl)}
        preview={false}
        width={'90%'}
        placeholder={<Spin />}
      />
    </div>
  );
};

const ItemDetails = ({ item, price, isAvailable, offer }) => {
  return (
    <>
      <h1 className='line-clamp-2 text-[20px] max-mq-450:text-[16px] font-semibold'>
        {item}
      </h1>
      <div className='flex gap-5 items-center'>
        <h2 className='flex font-bold'>
          {parseInt(calculatePrice(price, offer)).toLocaleString()}
          <span className='text-[gray] text-[10px] self-center pl-[1px] pt-[4px]'>
            ksh
          </span>
        </h2>
        <h2
          className={`${
            isAvailable ? 'bg-[green]' : 'bg-[red]'
          } px-[10px] py-[1px] text-white text-[12px] select-none`}
        >
          {isAvailable ? 'inStock' : 'Out Of Stock'}
        </h2>
      </div>
    </>
  );
};

const QuantityGenerator = ({ qyt, _id, setData, data }) => {
  const [quantity, setQuantity] = useState(qyt);
  const onAdd = () => {
    const updatedData = data.map((item) => {
      if (item._id === _id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setData(updatedData);
    setQuantity(quantity + 1);
  };

  const onSub = () => {
    if (quantity > 1) {
      const updatedData = data.map((item) => {
        if (item._id === _id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setData(updatedData);
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='flex select-none gap-2 items-center h-[25px]'>
      <div
        onClick={onAdd}
        className='shadow-bsh08  h-[100%] w-[30px] flex items-center justify-center cursor-pointer hover:bg-[blue] hover:text-white py-3'
      >
        <FaPlus className='text-[10px]' />
      </div>
      <div className='shadow-bsh08 flex items-center justify-center w-[40px]  h-[100%] '>
        <input
          type='number'
          value={quantity}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            if (value > 1000) value = 1000;

            if (!isNaN(value) && value >= 1) {
              setQuantity(value);
            } else {
              setQuantity(1);
            }
          }}
          min={1}
          max={1000}
          className='max-w-full text-center'
          style={{
            border: 'none',
            outline: 'none',
          }}
        />
      </div>
      <div
        onClick={onSub}
        className='shadow-bsh08 hover:bg-[red] hover:text-white h-[100%] w-[30px] flex items-center justify-center cursor-pointer py-3 '
      >
        <FaMinus className='text-[10px]' />
      </div>
    </div>
  );
};

export default ShopingCart;
