import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../../context/MainContext';
import { Button } from '@mui/material';

const HeaderBtns = ({ resLogOut, setOnEditNames }) => {
  const navigate = useNavigate();

  const { setSmallNotify } = useContext(MainContext);

  return (
    <div className='flex gap-2 absolute flex-col right-0 justify-between h-full'>
      <section className='flex gap-2  right-0'>
        <div>
          <Button
            color='warning'
            variant='outlined'
            onClick={() => setOnEditNames(true)}
            style={{
              width: '120px',
              height: '30px',
              textTransform: 'capitalize',
            }}
          >
            edit
          </Button>
        </div>
        <div className='max-mq-450:w-[100px] h-[30px]'>
          <Button
            onClick={() => navigate('/orders')}
            variant='contained'
            style={{
              width: '100px',
              height: '30px',
              textTransform: 'capitalize',
            }}
          >
            my oders
          </Button>
        </div>
      </section>
      <section className='flex gap-2 justify-end'>
        <Button
          color='error'
          onClick={resLogOut}
          variant='contained'
          style={{
            width: '120px',
            height: '30px',
            textTransform: 'capitalize',
          }}
        >
          logout
        </Button>
      </section>
    </div>
  );
};
export default HeaderBtns;
