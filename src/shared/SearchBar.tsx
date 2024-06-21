import { useRef } from 'react';
import style from './sb.module.css';
interface props {
  onChange: (e: any) => void;
  value: string;
}
const SearchBar = ({ onChange, value }: props) => {
  const inputRef: any = useRef()
  return (
    <form  className={`${style.form}`}>
      <button onClick={() => inputRef.current.focus()} type='button'>
        <svg
          width='17'
          height='16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-labelledby='search'
        >
          <path
            d='M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9'
            stroke='currentColor'
            strokeWidth='1.333'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      </button>
      <input
        ref={inputRef}
        className={style.input}
        placeholder='Type your text'
        type='search'
        onChange={onChange}
        value={value}
      />
     
    </form>
  );
};
export default SearchBar;
