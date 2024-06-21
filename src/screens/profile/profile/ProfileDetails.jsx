import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { MainContext } from '@/context/MainContext';
import EmailChange from './EmailChange';
import PhoneAdd from './PhoneAdd';
import MapModal from '@/screens/maps/MapModal';
import { Fsm } from '../../../context/Fsm';
function ProfileDetails() {
  const [onAddPhone, setOnAddPhone] = useState(false);
  const [onEditEmail, setOnEditEmail] = useState(false);
  const { authInfo } = useContext(Fsm);
  const data = authInfo.data;
  const { setSmallNotify } = useContext(MainContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EmailChange
        onEditEmail={onEditEmail}
        setOnEditEmail={setOnEditEmail}
        setSmallNotify={setSmallNotify}
      />
      <PhoneAdd
        onAddPhone={onAddPhone}
        setOnAddPhone={setOnAddPhone}
        setSmallNotify={setSmallNotify}
      />
      <MapModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSmallNotify={setSmallNotify}
      />
      <ul className='shadow-bsh64t mt-10'>
        <li className='flex  p-1 gap-1 shadow-bsh64b py-2'>
          <p className='text-[18px]  min-w-[75px] first-letter:capitalize'>
            name:
          </p>
          <p className='text-[18px] font-semibold pl-[10px] capitalize'>
            {data?.name.substring(0, 10)} {data?.surname.substring(0, 20)}
          </p>
        </li>
        <li className='flex  p-1 gap-1 shadow-bsh64b py-2'>
          <p className='text-[18px]  min-w-[75px] first-letter:capitalize'>
            email:
          </p>
          <p className='text-[18px] font-semibold pl-[10px] '>
            {data?.email}

            <span
              className='text-[blue] underline ml-2 cursor-pointer'
              onClick={() => setOnEditEmail(true)}
            >
              change
            </span>
          </p>
        </li>
        <li className='flex  p-1 gap-1 shadow-bsh64b py-2'>
          <p className='text-[18px]  min-w-[75px] first-letter:capitalize'>
            phone:
          </p>
          <p className='text-[18px] font-semibold pl-[10px] '>
            {data?.phone}
            {data?.isPhoneConfirmed ? (
              <span
                className='text-[blue] underline ml-2 cursor-pointer'
                onClick={() => setOnAddPhone(true)}
              >
                change
              </span>
            ) : (
              <span
                className='text-[blue] underline ml-2 cursor-pointer'
                onClick={() => setOnAddPhone(true)}
              >
                add phone
              </span>
            )}
          </p>
        </li>
        <li className='flex  p-1 gap-1 shadow-bsh64b py-2'>
          <p className='text-[18px]  min-w-[75px] first-letter:capitalize'>
            address:
          </p>
          <p className='text-[18px] font-semibold pl-[10px] '>
            {data?.address.value}
            {data?.address ? (
              <span
                className='text-[blue] underline ml-2 cursor-pointer'
                onClick={() => setIsModalOpen(true)}
              >
                change
              </span>
            ) : (
              <Button
                sx={{
                  textTransform: 'capitalize',
                  height: '30px',
                  marginLeft: '10px',
                }}
                variant='outlined'
                onClick={() => setIsModalOpen(true)}
              >
                add address
              </Button>
            )}
          </p>
        </li>
      </ul>
    </>
  );
}

export default ProfileDetails;
