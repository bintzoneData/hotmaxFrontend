import { Button } from '@mui/material';
import { Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import FormSpinner from '../../../assets/spinners/FormSpinner';
import { useFetch } from '../../../hooks/useFetchHook';
import { Fsm } from '../../../context/Fsm';

function EmailChange({ onEditEmail, setOnEditEmail, setSmallNotify }) {
  const { authInfo } = useContext(Fsm);
  const { postFetch, fetchLoading } = useFetch();
  const [formData, setFormData] = useState({
    email: authInfo.data?.email || '',
  });
  const [errorForm, setErrorForm] = useState({ type: '', msg: '' });
  const { email } = formData;
  const onMutate = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const onClose = () => {
    setOnEditEmail(false);
    setFormData({ email: authInfo.data?.email || '' });
  };
  const onUpdate = async () => {
    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,3}$/;
    if (!emailRegex.test(email)) {
      setErrorForm({
        type: 'all',
        msg: 'use valid email address',
      });
      return;
    }
    if (email === authInfo.data?.email) {
      setErrorForm({
        type: 'all',
        msg: 'nothing to update, make changes',
      });
      return;
    }

    const res = await postFetch(`/clients/updateEmail`, 'PUT', { email });
    if (!res.ok) {
      console.log(res);
      setErrorForm({
        type: 'all',
        msg: res.msg || 'Email not updated',
      });
      return;
    }
    setSmallNotify({
      show: true,
      msg: res.msg || 'Email sent successfully',
      type: 'success',
      time: 3000,
    });
    setOnEditEmail(false);
  };
  return (
    <Modal
      okButtonProps={{ style: { display: 'none' } }} // Hide the OK button
      cancelButtonProps={{ style: { display: 'none' } }} // Hide the Cancel button
      title={'Edit Email Address'}
      open={onEditEmail}
      onCancel={onClose}
      okText='Add address'
      style={{ padding: 0 }}
    >
      {fetchLoading && <FormSpinner />}
      <section className='relative'>
        <div className='flex flex-col gap-3 mt-5'>
          <Input
            placeholder='Enter your name'
            className='h-[40px] text-[18px] font-semibold'
            id='email'
            type='email'
            value={email}
            onChange={onMutate}
          />
        </div>
        {errorForm.type === 'all' && (
          <p className='text-red-500'>{errorForm.msg}</p>
        )}
        <div className='flex justify-end mt-5'>
          <Button
            variant='contained'
            onClick={() => {
              setErrorForm({ type: '', msg: '' });
              onUpdate();
            }}
            disabled={
              !authInfo.data?.email === '' ||
              email === '' ||
              email === authInfo.data?.email
            }
          >
            update
          </Button>
        </div>
        {email === authInfo.data?.email && (
          <p className='text-[14px] text-[gray] '>
            <b className='text-black'>NB:</b> to update please make some changes
          </p>
        )}
      </section>
    </Modal>
  );
}

export default EmailChange;
