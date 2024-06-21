import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
function DropDown({ DropDownData }) {
  return (
    <Paper>
      <ul className='flex flex-col z-[90] bg-[white]   pt-1'>
        {DropDownData.map((item, index) => (
          <Link
            to={'/products' + item.linkUrl}
            className='h-[30px] cursor-pointer capitalize hover:bg-slate-400 flex items-center justify-center bsh64'
            key={index}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </Paper>
  );
}

export default DropDown;
