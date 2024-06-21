import SearchBar from '@/shared/SearchBar';
import { FaTimes } from 'react-icons/fa';
import BarList from './BarList';

const Bar = ({ onClose }) => {
  return (
    <div className='w-[300px] '>
      <header className='flex justify-between items-center p-1.5  bsh64 '>
        <h1 className='text-2xl capitalize tracking-wider text-mainColor font-bold  select-none'>
          hotmax
        </h1>
        <FaTimes
          onClick={onClose}
          className='text-2xl cursor-pointer hover:text-[#5ad0ee]'
        />
      </header>
      <div className='mt-2 flex justify-center w-[100%]'>
        <SearchBar
          onChange={(e) => {
            console.log(e.target.value);
          }}
          value=''
        />
      </div>
      <main className=' mt-5'>
        <BarList onClose={onClose} />
      </main>
    </div>
  );
};

export default Bar;
