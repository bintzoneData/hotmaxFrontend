import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { Badge } from 'antd';
import { useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = ({ name, onClose }) => {
  const navigate = useNavigate();
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) : [];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='bg-mainColor h-[50px] select-none flex items-center justify-between px-2 '>
      <section className='flex items-center'>
        <FaBars
          onClick={onClose}
          className='text-3xl mr-5 text-white cursor-pointer hover:text-[#5ad0ee]'
        />
        <Link
          to='/'
          className='text-3xl capitalize text-white font-bold  select-none'
        >
          {name}
        </Link>
      </section>
      <ul className='flex mr-3 gap-5 items-center'>
        <Link to='/cart' className='mt-2'>
          <Badge
            className='cursor-pointer'
            count={cart.length}
            showZero
            offset={[-6, 10]}
          >
            <GiShoppingCart className='text-4xl  text-white' />
          </Badge>
        </Link>
        <Link to='/me' className=''>
          <FaRegUserCircle className='text-3xl  text-white' />
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
