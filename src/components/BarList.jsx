import { GrPersonalComputer } from 'react-icons/gr';
import { IoTvSharp } from 'react-icons/io5';
import { IoMdPhonePortrait } from 'react-icons/io';
import { BsSpeakerFill } from 'react-icons/bs';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInfo } from '@/hooks/useInfoHook';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fsm } from '../context/Fsm';

function BarList({ onClose }) {
  const { mainDetails } = useContext(Fsm);
  const categoryView = mainDetails?.data?.categoryView;
  return (
    <div className='flex flex-col gap-[5px] select-none'>
      <h1 className='text-[20px] capitalize px-4 font-bold  select-none'>
        categories
      </h1>
      <ul>
        {categoryView?.map((item, index) =>
          item.type === 'main' ? (
            <ListBar
              key={index}
              name={item.name}
              url={item.linkUrl}
              onClose={onClose}
              icon={
                item.name === 'tvs' ? (
                  <IoTvSharp />
                ) : item.name === 'woofers' ? (
                  <BsSpeakerFill />
                ) : item.name === 'phones' ? (
                  <IoMdPhonePortrait />
                ) : item.name === 'laptops | pc' ? (
                  <GrPersonalComputer />
                ) : (
                  ''
                )
              }
            />
          ) : (
            <ListDrop
              key={item._id}
              data={item.children}
              onClose={onClose}
              name='more'
              icon={<FaAngleDown />}
            />
          )
        )}
      </ul>
    </div>
  );
}

const ListBar = ({ name, icon, url, onClose }) => {
  return (
    <Link
      to={'/products' + url}
      onClick={onClose}
      className='h-[50px] cursor-pointer capitalize hover:bg-[#d8e9f0] flex items-center gap-[10px] shadow-bsh64b first:shadow-bsh64tb px-3 text-[18px]'
    >
      {icon}
      <p className='capitalize'>{name}</p>
    </Link>
  );
};

// listdrop
const ListDrop = ({ name, data, onClose }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li
        onClick={() => setOpen(!open)}
        className={`h-[50px] cursor-pointer capitalize hover:bg-[#d8e9f0] flex items-center justify-between   px-3 text-[18px] ${
          !open ? 'shadow-bsh64b' : ''
        }`}
      >
        <p className='capitalize'>{name}</p>
        {open ? <FaAngleDown /> : <FaAngleUp />}
      </li>
      {open &&
        data?.map((item, index) => (
          <Droplist
            key={index}
            name={item.name}
            url={item.linkUrl}
            open={open}
            onClose={onClose}
          />
        ))}
    </>
  );
};

const Droplist = ({ name, open, url, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <Link
        to={'/products' + url}
        onClick={onClose}
        className='h-[50px] cursor-pointer capitalize hover:bg-[#d8e9f0] flex items-center gap-[10px] shadow-bsh64b first:shadow-bsh64tb px-3 text-[18px]'
      >
        {open}
        <p className='capitalize'>{name}</p>
      </Link>{' '}
    </motion.div>
  );
};
export default BarList;
