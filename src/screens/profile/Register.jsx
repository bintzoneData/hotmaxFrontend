import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@mui/material';
import FormSpinner from '@/assets/spinners/FormSpinner';
import { AuthContext } from '@/context/AuthContext';
function Register() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
  });
  const { email, password, password2, name, surname } = formData;
  const [errorForm, setErrorForm] = useState({
    type: '',
    msg: '',
  });
  const onMutate = (e) => {
    setErrorForm({
      type: '',
      msg: '',
    });
    const { id, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (
      id === 'password' &&
      value !== password2 &&
      value.length > 1 &&
      password2 !== ''
    ) {
      setErrorForm({
        type: 'password',
        msg: 'passwords do not match',
      });
    }
    if (
      id === 'password2' &&
      value !== password &&
      value.length > 1 &&
      password !== ''
    ) {
      setErrorForm({
        type: 'password',
        msg: 'passwords do not match',
      });
    }
    if (id === 'name' && value !== '' && value.length < 3) {
      setErrorForm({
        type: 'name',
        msg: 'name must be at least 3 characters',
      });
    }
    if (id === 'surname' && value !== '' && value.length < 3) {
      setErrorForm({
        type: 'surname',
        msg: 'surname must be at least 3 characters',
      });
    }
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
    if (password !== password2) {
      setErrorForm({
        type: 'password',
        msg: 'passwords do not match',
      });
      return;
    }
    const formData2 = {
      name,
      surname,
      email,
      password,
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/clients/singup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData2),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorForm({
          type: 'all',
          msg: data.message || 'An error occurred, please try again',
        });
        return;
      }
      localStorage.setItem('authToken', JSON.stringify(data.token));
      navigate('/me');
      setLoggedIn(true);
    } catch (error) {
      setErrorForm({
        type: 'all',
        msg: error.message || 'An error occurred, please try again',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='flex justify-center mt-[15px]'>
        <main className='bg-white flex-1 shadow-bsh08 p-2 rounded-md max-w-[600px]   max-mq-450:w-[95%] min-h-[300px] relative'>
          {loading && <FormSpinner />}
          <header className='select-none mb-4 shadow-bsh64b pb-2'>
            <h1 className='text-[24px] text-center font-bold text-mainColor '>
              Hotmax
            </h1>
            <p className='text-[18px] text-center '>Register new account</p>
          </header>
          <form onSubmit={onSubmit} className=' flex flex-col gap-1 '>
            <InputField
              label='Name'
              type='text'
              value={name}
              onMutate={onMutate}
              id='name'
            />
            {errorForm.type === 'name' && (
              <p className='text-[red]'>{errorForm.msg}</p>
            )}
            <InputField
              label='surname'
              type='text'
              value={surname}
              onMutate={onMutate}
              id='surname'
            />
            {errorForm.type === 'surname' && (
              <p className='text-[red]'>{errorForm.msg}</p>
            )}
            <InputField
              label='email'
              type='email'
              value={email}
              onMutate={onMutate}
              id='email'
            />
            {errorForm.type === 'email' && (
              <p className='text-[red]'>{errorForm.msg}</p>
            )}
            <InputPassword
              label='Password'
              value={password}
              onMutate={onMutate}
              id='password'
            />
            <InputPassword
              label='confirm password'
              value={password2}
              onMutate={onMutate}
              id='password2'
            />
            {errorForm.type === 'password' && (
              <p className='text-[red]'>{errorForm.msg}</p>
            )}
            {errorForm.type === 'all' && (
              <p className='text-[red]'>{errorForm.msg}</p>
            )}
            <div className='flex justify-end items-center mt-3'>
              <Button
                style={{ width: '100px', textTransform: 'capitalize' }}
                type='submit'
                variant='contained'
                color='primary'
                disabled={errorForm.type !== '' || errorForm.msg !== ''}
              >
                sing up
              </Button>
            </div>
          </form>
          <p className='text-[gray] mt-5 text-center flex-1 '>
            Already have an account?{' '}
            <Link
              to={'/login'}
              className='text-mainColor underline cursor-pointer'
            >
              singIn
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
// input field
const InputField = ({ label, type, value, onMutate, id }) => {
  return (
    <section className='flex flex-col gap-1'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onMutate}
        type={type}
        className='shadow-bsh08 h-[40px] outline-1 outline-[#8accf5] rounded-md px-2 py-1'
        required
      />
    </section>
  );
};

//   input password
const InputPassword = ({ label, value, onMutate, id }) => {
  const [show, setshow] = useState(false);
  return (
    <section className='flex flex-col gap-1'>
      <label> {label} </label>
      <div className='shadow-bsh08 h-[40px] inputFocus  rounded-md px-2 py-1 pr-3 flex items-center '>
        <input
          id={id}
          value={value}
          onChange={onMutate}
          type={show ? 'text' : 'password'}
          className='outline-none flex-1'
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
    </section>
  );
};
const Navbar = () => {
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
    </div>
  );
};

export default Register;
