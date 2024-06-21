import hassan from '@/assets/hassan.jpeg';
import { Image } from 'antd';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FromSpinner from '@/assets/spinners/FormSpinner';
import HeaderBtns from './HeaderBtns';
import EditNames from './EditNames';
import ProfileDetails from './ProfileDetails';
import { useFetch } from '../../../hooks/useFetchHook';
import { MainContext } from '../../../context/MainContext';
import { Fsm } from '../../../context/Fsm';

function ProfileView({ data, userData }) {
  const navigate = useNavigate();
  const { setAuthInfo, resetFsm } = useContext(Fsm);
  const { fetchPrivateData, fetchLoading } = useFetch();
  const [onEditNames, setOnEditNames] = useState(false);
  const { setSmallNotify } = useContext(MainContext);
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
  return (
    <div className='p-[10px] relative'>
      <EditNames
        onEditNames={onEditNames}
        setOnEditNames={setOnEditNames}
        data={data}
        userData={userData}
      />

      <section className='self-center mt-4  bg-white shadow-bsh08 p-3 rounded-md   relative   '>
        {fetchLoading && <FromSpinner />}
        <header className='flex justify-between relative'>
          <ImageView imgUrl={hassan} username={data.username} />
          <HeaderBtns setOnEditNames={setOnEditNames} resLogOut={onLogout} />
        </header>
        <main>
          <ProfileDetails data={data} />
        </main>

        <footer className='flex justify-between mt-2 items-center'>
          <Link to='/edit' className='text-[red] underline'>
            delete account
          </Link>
          <Link to='/edit' className='text-[blue] underline'>
            change password
          </Link>
        </footer>
      </section>
    </div>
  );
}
const ImageView = ({ imgUrl, username }) => {
  return (
    <section className='flex flex-col gap-2 '>
      <div className='w-[150px]  h-[150px] max-mq-450:w-[100px] max-mq-450:h-[100px]'>
        <Image
          width={'100%'}
          height={'100%'}
          className='radius-circle object-cover shadow-bsh01'
          src={imgUrl}
          preview={false}
        />
      </div>
      <h1 className='font-bold text-nowrap'>
        <span className='text-[gray] font-normal'>username: </span>
        {username}
      </h1>
    </section>
  );
};

export default ProfileView;
