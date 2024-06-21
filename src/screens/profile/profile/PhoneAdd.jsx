import { Button } from '@mui/material';
import { Divider, Input, Modal, Select } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FormSpinner from '../../../assets/spinners/FormSpinner';
import moment from 'moment';
import { Fsm } from '../../../context/Fsm';
import { useFetch } from '../../../hooks/useFetchHook';
function PhoneAdd({ onAddPhone, setOnAddPhone, setSmallNotify }) {
  const { postFetch, fetchLoading, fetchPrivateData } = useFetch();
  const { authInfo } = useContext(Fsm);
  const data = authInfo.data;
  const [showButton, setShowButton] = useState(false);
  const [targetTime, setTargetTime] = useState(
    new Date(data.phoneTokenResend).getTime()
  );
  const [timeLeft, setTimeLeft] = useState({ minutes: '00', seconds: '00' });
  const [loading, setLoading] = useState(false);
  const codeInput = useRef();
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
    sent: false,
  });
  const [errorForm, setErrorForm] = useState({ type: '', msg: '' });
  const { phone, code, sent } = formData;
  const onMutate = (e) => {
    setErrorForm({ type: '', msg: '' });
    const { id, value } = e.target;
    if (id === 'code' && value.toString().length >= 5) {
      e.preventDefault();
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const onClose = () => {
    setOnAddPhone(false);
    setFormData({ phone: '', code: '', sent: false });
  };
  const onPhone = async () => {
    const res = await postFetch(`/clients/addPhone`, 'POST', {
      phone: Number(phone),
    });
    if (!res.ok) {
      setErrorForm({
        type: 'phone',
        msg: res.msg || 'phone not updated',
      });
      return;
    }
    setTargetTime(new Date(res.data.phoneTokenResend).getTime());
    setShowButton(false);
    setFormData((prevState) => ({
      ...prevState,
      sent: true,
    }));
  };

  const onCode = async () => {
    const res = await postFetch(`/clients/confirmPhone`, 'PUT', {
      code: code,
    });
    if (!res.ok) {
      setErrorForm({
        type: 'code',
        msg: res.msg || 'phone not updated',
      });
      return;
    }

    setSmallNotify({
      show: true,
      msg: res.msg || 'phone updated successfully',
      type: 'success',
      time: 3000,
    });
    setFormData({ phone: '', code: '', sent: false });
    setOnAddPhone(false);
  };
  const onResend = async () => {
    const res = await fetchPrivateData(`/clients/resendPhone`);
    if (!res.ok) {
      setErrorForm({
        type: 'code',
        msg: res.msg || 'phone not updated',
      });
      return;
    }
    setTargetTime(new Date(res.data.phoneTokenResend).getTime());

    setShowButton(false);
    setSmallNotify({
      show: true,
      msg: res.msg || 'code resend successfully',
      type: 'success',
      time: 3000,
    });
  };
  useEffect(() => {
    if (sent === true) {
      codeInput.current.focus();
    }
  }, [sent]);
  useEffect(() => {
    if (targetTime < Date.now()) {
      setShowButton(true);
    } else {
      const updateCountdown = () => {
        const now = moment();
        const duration = moment.duration(moment(targetTime).diff(now));

        if (duration.asSeconds() <= 0) {
          setTimeLeft({ minutes: '00', seconds: '00' });
          setShowButton(true);
          return;
        }

        const minutes = Math.floor(duration.asMinutes());
        const seconds = duration.seconds();

        setTimeLeft({
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        });
      };

      // Initial call to set the countdown
      updateCountdown();

      // Set up an interval to update the countdown every second
      const intervalId = setInterval(updateCountdown, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [targetTime]);

  return (
    <Modal
      okButtonProps={{ style: { display: 'none' } }} // Hide the OK button
      cancelButtonProps={{ style: { display: 'none' } }} // Hide the Cancel button
      title={`${data.phone ? 'Update phone' : 'Add phone'}`}
      open={onAddPhone}
      onCancel={onClose}
      okText='Add address'
      style={{ padding: 0 }}
      maskClosable={false}
    >
      {fetchLoading && <FormSpinner />}
      <section className='relative'>
        <div className='flex gap-3 mt-5'>
          <Select
            id='code'
            defaultValue={'+254'}
            className='h-[40px] text-[18px] font-semibold'
            disabled
          />
          <Input
            className='h-[40px] text-[18px] font-semibold'
            id='phone'
            type='number'
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-'].some((char) => e.key === char)) {
                e.preventDefault();
              }
            }}
            disabled={sent}
            value={phone}
            placeholder={
              data?.phone ? 'Enter new phone number' : 'Enter phone number'
            }
            onChange={onMutate}
          />
        </div>
        {errorForm.type === 'phone' && (
          <p className='text-red-500 mt-2'>{errorForm.msg}</p>
        )}
        {!sent && (
          <div className='flex justify-end mt-5'>
            <Button
              variant='contained'
              onClick={onPhone}
              disabled={phone === '' || phone === data?.phone}
            >
              {data?.phone ? 'Update phone' : 'Add phone'}
            </Button>
          </div>
        )}
      </section>
      {sent && (
        <>
          <Divider />
          <section className='  '>
            <div className='flex flex-col gap-1 mt-5'>
              <label className='text-[16px] capitalize'>
                enter verification code
              </label>
              <Input
                className='h-[40px] text-[18px] font-semibold'
                id='code'
                type='number'
                ref={codeInput}
                onKeyDown={(e) => {
                  if (['e', 'E', '+', '-'].some((char) => e.key === char)) {
                    e.preventDefault();
                  }
                }}
                value={code}
                onChange={onMutate}
              />
            </div>
            {errorForm.type === 'code' && (
              <p className='text-red-500  mt-2'>{errorForm.msg}</p>
            )}
            <div className='flex justify-between mt-5 items-center'>
              {showButton ? (
                <Button
                  onClick={onResend}
                  variant='outlined'
                  sx={{ textTransform: 'capitalize', height: '30px' }}
                >
                  resend confirmation
                </Button>
              ) : (
                <div className='text-[gray]'>
                  resend:{' '}
                  <span className='text-black font-semibold'>
                    {' '}
                    {timeLeft.minutes}:{timeLeft.seconds}
                  </span>
                </div>
              )}
              <Button
                variant='contained'
                onClick={onCode}
                disabled={code.toString().length !== 4}
              >
                submit
              </Button>
            </div>
          </section>
        </>
      )}
    </Modal>
  );
}

export default PhoneAdd;
