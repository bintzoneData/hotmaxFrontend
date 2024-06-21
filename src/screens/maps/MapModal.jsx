import { useEffect, useState } from 'react';
import InputLocation from './MapView';
import { Modal } from 'antd';
import { Button } from '@mui/material';
import FromSpinner from '@/assets/spinners/FormSpinner';
import { Fsm } from '../../context/Fsm';
import { useContext } from 'react';
import { useFetch } from '../../hooks/useFetchHook';
const MapModal = ({ isModalOpen, setIsModalOpen, setSmallNotify }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [errorForm, setErrorForm] = useState({
    type: '',
    msg: '',
  });
  const { authInfo } = useContext(Fsm);
  const { postFetch, fetchLoading } = useFetch();
  const onAddress = async (address) => {
    if (address) {
      const addressData = {
        value: address.formatted_address,
        latitude: address.latitude,
        longitude: address.longitude,
      };
      const res = await postFetch('/clients/addAdress', 'PUT', {
        address: addressData,
      });
      if (!res.ok) {
        setErrorForm({
          type: 'address',
          msg: res.msg || 'address not added',
        });
        return;
      }
      setIsModalOpen(false);

      setSmallNotify({
        show: true,
        msg: res.msg || 'address updated successfully',
        type: 'success',
        time: 3000,
      });
    }
  };
  return (
    <>
      <Modal
        okButtonProps={{ style: { display: 'none' } }} // Hide the OK button
        cancelButtonProps={{ style: { display: 'none' } }} // Hide the Cancel button
        className=''
        title={'Update address'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText='Add address'
        maskClosable={false}
      >
        {fetchLoading && <FromSpinner />}
        <section className='h-[200px]'>
          <div className='flex rounded-md '>
            <InputLocation
              setSelectedPlace={(e) => {
                setErrorForm({
                  type: '',
                  msg: '',
                });
                setSelectedPlace(e);
              }}
              inputClassName='shadow-bsh08 flex-1 rounded-md  '
            />
          </div>
          {errorForm.type === 'address' && (
            <p className='text-red-500 mt-2'>{errorForm.msg}</p>
          )}
          <div className='flex justify-between gap-5 mt-4'>
            <Button
              color='error'
              className=''
              variant='outlined'
              onClick={() => setIsModalOpen(false)}
            >
              cancel
            </Button>
            <Button
              color='primary'
              className=''
              variant='contained'
              disabled={!selectedPlace}
              onClick={() => onAddress(selectedPlace)}
            >
              add address
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default MapModal;
