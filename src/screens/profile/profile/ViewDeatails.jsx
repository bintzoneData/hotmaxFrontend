import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { MainContext } from '../../../context/MainContext';
import { AuthContext } from '../../../context/AuthContext';
import EmailChange from './EmailChange';
import { Link } from 'react-router-dom';

const ViewDetails = ({ data }) => {
  const [onEditEmail, setOnEditEmail] = useState(false);
  const { setSmallNotify } = useContext(MainContext);
  const { fetchClient } = useContext(AuthContext);
  return (
    <>
      <EmailChange
        data={data}
        onEditEmail={onEditEmail}
        setOnEditEmail={setOnEditEmail}
        setSmallNotify={setSmallNotify}
        fetchClient={fetchClient}
      />
      <ul className=''>
        <li className='flex min-h-[40px] gap-3 items-center  first:shadow-bsh64tb shadow-bsh64b px-2 '>
          <p className=' text-{gray} min-w-[70px]  '>name:</p>
          <p className=' font-bold first-letter:uppercase'>
            {data?.name.substring(0, 10)}
          </p>
        </li>
        <li className='flex min-h-[40px] gap-3 items-center  first:shadow-bsh64tb shadow-bsh64b px-2'>
          <p className=' text-{gray} '>surname:</p>
          <p className=' font-bold first-letter:uppercase'>
            {data?.surname.substring(0, 10)}
          </p>
        </li>
        <li className='flex  p-1 gap-1 shadow-bsh64b py-2'>
          <p className='text-[18px] text-[gray] min-w-[75px]'>email</p>
          <p className='text-[18px]'>
            {data?.email}
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </li>
        <li className='flex min-h-[40px] gap-3 items-center  first:shadow-bsh64tb shadow-bsh64b px-2'>
          <p className=' text-{gray} min-w-[70px]  '>phone:</p>
          <p className=' font-bold first-letter:uppercase'>{data?.phone}</p>
        </li>
        <li className='flex min-h-[40px] gap-3 items-center  first:shadow-bsh64tb shadow-bsh64b px-2'>
          <p className=' text-{gray} min-w-[70px]  '>town:</p>
          <p className=' font-bold first-letter:uppercase'>{data?.town}</p>
        </li>

        <li className='flex min-h-[40px] gap-3 items-center  first:shadow-bsh64tb shadow-bsh64b px-2'>
          <p className=' text-{gray} min-w-[70px]  '>address:</p>
          {!data?.address && (
            <p className=' font-bold first-letter:uppercase'>
              {data?.address}{' '}
              <span className='ml-5'>
                <Button
                  variant='outlined'
                  className='h-[28px] '
                  color='primary'
                  style={{
                    textTransform: 'capitalize',
                  }}
                >
                  edit address
                </Button>
              </span>
            </p>
          )}
          {data?.address && (
            <Button
              variant='contained'
              className='h-[28px] '
              color='primary'
              style={{
                textTransform: 'capitalize',
              }}
            >
              add address
            </Button>
          )}
        </li>
      </ul>
    </>
  );
};
export default ViewDetails;
