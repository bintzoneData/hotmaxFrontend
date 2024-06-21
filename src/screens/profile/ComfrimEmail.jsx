import { Button } from '@mui/material';
import { Result } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
function ComfrimEmail() {
  const pramas = useParams();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState({
    ok: false,
    msg: '',
    status: 400,
  });
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useLayoutEffect(() => {
    const fetchData = async () => {
      console.log(123);
      try {
        const res = await fetch(`${apiUrl}/clients/confirm/${pramas.token}`);

        const data = await res.json();

        if (!res.ok) {
          setConfirmation({
            ok: false,
            msg: data.message || 'link is not valid',
            status: 400,
          });
          return;
        }
        // clear local storage
        localStorage.removeItem('authToken');
        setConfirmation({
          ok: true,
          msg: data.message || 'Your email has been successfully confirmed',
          status: 200,
        });
      } catch (error) {
        setConfirmation({ ok: false, msg: 'link is not valid', status: 400 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return null;
  return (
    <div>
      <Navbar />
      {!confirmation.ok ? (
        <Result
          status='404'
          title={
            <p className='text-[18px] font-semibold'>{confirmation.msg}</p>
          }
          extra={
            <Button variant='contained' onClick={() => navigate('/')}>
              go to Home
            </Button>
          }
        />
      ) : (
        <div className='mt-[100px]'>
          <Result
            icon={<SmileOutlined />}
            title={
              <p className='text-[18px] font-semibold'>{confirmation.msg}</p>
            }
            extra={
              <Button variant='contained' onClick={() => navigate('/login')}>
                login
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
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
export default ComfrimEmail;
