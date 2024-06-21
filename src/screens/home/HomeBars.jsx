import { IoTvSharp } from 'react-icons/io5';
import { IoMdPhonePortrait } from 'react-icons/io';
import { BsSpeakerFill } from 'react-icons/bs';
import { GrPersonalComputer } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import DropDown from '../../shared/DropDown';
import { FaAngleDown } from 'react-icons/fa';
import { Fsm } from '../../context/Fsm';
export default function HomeBars() {
  const { mainDetails } = useContext(Fsm);
  const categoryView = mainDetails.data?.categoryView;
  return (
    <div className='bsh64 h-[40px] flex  px-2'>
      <ul className='flex'>
        {categoryView.map((item, index) =>
          item.type === 'main' ? (
            <List
              key={index}
              name={item.name}
              url={item.linkUrl}
              icon={
                item.name === 'tvs' ? (
                  <IoTvSharp />
                ) : item.name === 'woofers' ? (
                  <BsSpeakerFill />
                ) : item.name === 'phones' ? (
                  <IoMdPhonePortrait />
                ) : item.name === 'laptops' ? (
                  <GrPersonalComputer />
                ) : (
                  ''
                )
              }
            />
          ) : (
            <ListDrop
              key={item._id}
              name='more'
              url={item.linkUrl}
              icon={<FaAngleDown />}
              data={item.children}
            />
          )
        )}
      </ul>
    </div>
  );
}

const List = ({ name, url, icon }) => {
  return (
    <Link
      to={'/products' + url}
      className='flex cursor-pointer text-nowrap hover:opacity-60 bsh64R px-7
      items-center gap-[5px]'
    >
      {icon}
      <p className='capitalize '>{name}</p>
    </Link>
  );
};
// list dropdown
const ListDrop = ({ name, url, icon, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className='relative flex items-center'
    >
      <main className='flex cursor-pointer relative px-7  hover:opacity-60 bsh64R items-center gap-[5px]'>
        <p className='capitalize '>{name}</p>
        {icon}
      </main>
      {open && (
        <div className='absolute z-50 text-center w-[200px] text-nowrap  top-[40px] right-0 left-0'>
          {' '}
          <DropDown DropDownData={data} url={url} />
        </div>
      )}
    </div>
  );
};
