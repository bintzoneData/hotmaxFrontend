import { Button } from '@mui/material';
import { Divider, Input, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import FormSpinner from '@/assets/spinners/FormSpinner';
import moment from 'moment';
import { calculatePrice } from '@/utilts/SsimpleFunctions';
function CancelModal({
  isModalOpen,
  onClose,
  isClientLoading,
  onClick,
  show,
  errorForm,
}) {
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
          are you sure ! you want to cancel this order ?
        </h1>
        <h3 className='text-xl font-semibold text-center  text-gray-600 capitalize'>
          {show}
        </h3>
        {errorForm.type === 'modal' && (
          <p className='text-center text-red-500 mt-2'>{errorForm.msg}</p>
        )}
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
            color='primary'
          >
            no
          </Button>
          <Button
            onClick={onClick}
            sx={{
              flexGrow: 1,
              height: '40px',
              fontSize: '18px',
              textTransform: 'capitalize',
            }}
            variant='contained'
            color='error'
          >
            yes
          </Button>
        </div>
      </section>
    </Modal>
  );
}

export default CancelModal;
