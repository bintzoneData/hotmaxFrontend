import { Button } from '@mui/material';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FormSpinner from '@/assets/spinners/FormSpinner';

import { Fsm } from '../../context/Fsm';
function Login() {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetFsm, setAuthInfo } = useContext(Fsm);
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [errorForm, setErrorForm] = useState({
    type: '',
    msg: '',
  });
  const onMutate = (e) => {
    setErrorForm({
      type: '',
      msg: '',
    });
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorForm({
        type: 'email',
        msg: 'use valid email address',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/clients/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorForm({
          type: 'all',
          msg: data.message || 'An error occurred, please try again',
        });
        setLoading(false);
        return;
      }
      localStorage.setItem('authToken', JSON.stringify(data.token));
      setAuthInfo({
        isFeteched: true,
        error: null,
        data: data.data,
        isLoggedIn: true,
      });
      resetFsm();
      navigate('/me');
    } catch (error) {
      setErrorForm({
        type: 'all',
        msg: 'something went wrong, please try again',
      });
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <Navbar />
      <div className='flex justify-center mt-[100px]'>
        <main className='bg-white shadow-bsh08 p-2 rounded-md min-mq-450:min-w-[450px] max-mq-450:w-[95%] min-h-[300px] relative'>
          {loading && <FormSpinner />}
          <header className='select-none mb-4 shadow-bsh64b pb-2'>
            <h1 className='text-[24px] text-center font-bold text-mainColor '>
              Hotmax
            </h1>
            <p className='text-[18px] text-center '>Login to your account</p>
          </header>
          <form onSubmit={onSubmit} className=' flex flex-col gap-4'>
            <section className='flex flex-col gap-1'>
              {/* <label > Email </label> */}
              <input
                id='email'
                value={email}
                onChange={onMutate}
                type='email'
                className='shadow-bsh08 h-[40px] outline-1 outline-[#8accf5] rounded-md px-2 py-1'
                placeholder='Enter your email'
                required
              />
              {errorForm.type === 'email' && (
                <p className='text-[red] select-none -mt-1 ml-1'>
                  {errorForm.msg}
                </p>
              )}
            </section>

            <section className='flex flex-col gap-1'>
              {/* <label > Password </label> */}
              <div className='shadow-bsh08 h-[40px] inputFocus  rounded-md px-2 py-1 pr-3 flex items-center '>
                <input
                  id='password'
                  value={password}
                  onChange={onMutate}
                  type={show ? 'text' : 'password'}
                  className='outline-none flex-1'
                  placeholder='Enter your password'
                  autoComplete='off'
                  required
                />
                {show ? (
                  <FaEye
                    className='text-[20px] cursor-pointer  text-mainColor'
                    onClick={() => setshow(!show)}
                  />
                ) : (
                  <FaEyeSlash
                    className='text-[20px] cursor-pointer text-mainColor'
                    onClick={() => setshow(!show)}
                  />
                )}
              </div>
              {errorForm.type === 'password' && (
                <p className='text-[red] select-none -mt-1 ml-1'>
                  {errorForm.msg}
                </p>
              )}
            </section>
            {errorForm.type === 'all' && (
              <p className='text-[red] select-none -mt-1 ml-1'>
                {errorForm.msg}
              </p>
            )}
            <div className='flex justify-between items-center'>
              <Link
                to={'/forgot'}
                className='text-mainColor cursor-pointer underline '
              >
                need a help?
              </Link>
              <Button
                style={{ width: '100px', textTransform: 'capitalize' }}
                type='submit'
                variant='contained'
                color='primary'
                disabled={
                  errorForm.type !== '' ||
                  errorForm.msg !== '' ||
                  email === '' ||
                  password === ''
                }
              >
                Login
              </Button>
            </div>
          </form>
          <p className='text-[gray] mt-5 text-center flex-1 '>
            Don't have an account?{' '}
            <Link
              to={'/singup'}
              className='text-mainColor underline cursor-pointer'
            >
              Register
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-mainColor h-[50px] select-none flex items-center justify-between px-2 '>
      <section className='flex items-center'>
        <Link
          to={'/'}
          className='text-3xl pl-5 capitalize text-white font-bold  select-none'
        >
          Hotmax
        </Link>
      </section>
      <div className=''>
        <Button
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate('/')}
          variant='contained'
        >
          home
        </Button>
      </div>
    </div>
  );
};
export default Login;
