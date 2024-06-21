import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '@/context/MainContext';
import FormSpinner from '@/assets/spinners/FormSpinner';
import EmailChange from './EmailChange';
import { useFetch } from '@/hooks/useFetchHook';
import { Fsm } from '@/context/Fsm';
const ComfrimEmailView = () => {
  const navigate = useNavigate();
  const { authInfo, setAuthInfo, resetFsm } = useContext(Fsm);
  const { fetchPrivateData, fetchLoading } = useFetch();
  const [onEditEmail, setOnEditEmail] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: '00', seconds: '00' });

  const targetTime = new Date(authInfo.data.emailVerificationResend).getTime();
  const { setSmallNotify } = useContext(MainContext);
  const onResend = async () => {
    const res = await fetchPrivateData(`/clients/resendEmail`);
    if (!res.ok) {
      setSmallNotify({
        show: true,
        msg: res.msg || 'Email not sent',
        type: 'warn',
        time: 3000,
      });
      return;
    }
    setShowButton(false);
    setSmallNotify({
      show: true,
      msg: res.msg || 'Email sent successfully',
      type: 'success',
      time: 3000,
    });
  };
  const onLogout = async () => {
    const res = await fetchPrivateData('/clients/logout');
    if (!res.ok) {
      setSmallNotify({
        show: true,
        msg: res.message,
        type: 'error',
        time: 3000,
      });
      return;
    }
    localStorage.removeItem('authToken');
    setAuthInfo({
      isFeteched: true,
      error: null,
      data: null,
      isLoggedIn: false,
    });
    setSmallNotify({
      show: true,
      msg: res.data.message || 'Logged out successfully',
      type: 'success',
      time: 3000,
    });
    resetFsm();
    navigate('/');
  };
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
    <div className='p-[10px] flex flex-col gap-[10px] '>
      <EmailChange
        onEditEmail={onEditEmail}
        setOnEditEmail={setOnEditEmail}
        setSmallNotify={setSmallNotify}
      />
      <section className='self-center mt-[100px] bg-white shadow-bsh08 p-3 rounded-md min-mq-600:min-w-[500px] max-mq-600:min-w-full relative flex flex-col items-center gap-4 '>
        {fetchLoading && <FormSpinner />}
        <header className='flex w-full  justify-between items-between items-center shadow-bsh64b pb-2'>
          <h1 className='text-[20px] font-bold'>Confirm your email</h1>
          <Button
            variant='outlined'
            color='error'
            onClick={onLogout}
            sx={{ textTransform: 'capitalize', height: '30px' }}
          >
            logout
          </Button>
        </header>
        <p className='text-center font-semibold'>
          Please check your email and confirm it. Thank you
        </p>
        <div className='w-full flex justify-center flex-col items-center gap-2 '>
          <Input
            className='max-w-[400px] text-center text-[18px] h-[40px] disabled:cursor-default disabled:text-black'
            value={authInfo.data?.email}
            disabled
          />
          <div className='w-full max-w-[400px] mt-3 flex justify-between items-center'>
            <p
              className='text-[blue] underline cursor-pointer'
              onClick={() => setOnEditEmail(true)}
            >
              change email
            </p>
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
                resend: {timeLeft.minutes}:{timeLeft.seconds}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComfrimEmailView;
