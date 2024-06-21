import { Button } from '@mui/material';
import { Divider, Input, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import FormSpinner from '@/assets/spinners/FormSpinner';
import moment from 'moment';
import { calculatePrice } from '../../utilts/SsimpleFunctions';
function PlaceModal({
  data,
  isModalOpen,
  setIsModalOpen,
  isClientLoading,
  onPlace,
}) {
  const onClose = () => {
    setIsModalOpen(false);
  };
  const sumOfQuantities = data.reduce((acc, item) => acc + item.quantity, 0);
  const sumtotal = data.reduce(
    (acc, item) =>
      acc + item.quantity * parseInt(calculatePrice(item.price, item.offer)),
    0
  );

  return (
    <Modal
      okButtonProps={{ style: { display: 'none' } }} // Hide the OK button
      cancelButtonProps={{ style: { display: 'none' } }} // Hide the Cancel button
      title={`Confirmation alert`}
      open={isModalOpen}
      onCancel={onClose}
      okText='Add address'
      style={{ padding: 0 }}
      maskClosable={false}
    >
      {isClientLoading && <FormSpinner />}
      <Divider className='mt-[1px]' />
      <section>
        <h1 className='text-xl font-semibold text-center first-letter:uppercase'>
          are you sure ! that you want to place this order ?
        </h1>
        <section className='flex justify-between my-7'>
          <div className='flex-1 capitalize flex  justify-center flex-col items-center shadow-bsh64r  '>
            <label className='text-lg text-[gray]'> quantity </label>
            <p className='text-lg font-semibold'>{sumOfQuantities}x</p>
          </div>
          <div className='flex-1 capitalize flex  justify-center flex-col items-center  '>
            <label className='text-lg text-[gray]'> total </label>

            <h2 className='flex font-bold'>
              {sumtotal.toLocaleString()}
              <span className='text-[gray] text-[10px] ml-[1px] self-center pl-[1px] pt-[4px]'>
                ksh
              </span>
            </h2>
          </div>
        </section>
        <div className='flex gap-5 mt-3'>
          <Button
            sx={{
              flexGrow: 1,
              height: '40px',
              fontSize: '18px',
              textTransform: 'capitalize',
            }}
            variant='contained'
            onClick={onClose}
            color='error'
          >
            cancel
          </Button>
          <Button
            onClick={onPlace}
            sx={{
              flexGrow: 1,
              height: '40px',
              fontSize: '18px',
              textTransform: 'capitalize',
            }}
            variant='contained'
            color='primary'
          >
            place
          </Button>
        </div>
      </section>
    </Modal>
  );
}

export default PlaceModal;
