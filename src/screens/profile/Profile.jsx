import { useContext, useEffect, useState } from 'react';
import ProfileView from './profile/ProfileView';
import ComfrimEmailView from './profile/ComfrimEmailView';
import { Fsm } from '@/context/Fsm';
import { socket } from '@/App';
import { useFetch } from '@/hooks/useFetchHook';
function Profile() {
  const { authInfo, setAuthInfo } = useContext(Fsm);
  const { fetchPrivateData } = useFetch();
  const [onEditNames, setOnEditNames] = useState(false);

  const fetchQuietly = async () => {
    const res = await fetchPrivateData('/clients/me');
    if (!res.ok) {
      return;
    }
    setAuthInfo((prev) => ({ ...prev, data: res.data }));
  };
  useEffect(() => {
    socket.on('updateClient', () => {
      fetchQuietly();
      console.log('clients updated');
    });
    // Clean up the event listener on component unmount
    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);
  return (
    <>
      {authInfo.data?.isConfirmed ? (
        <ProfileView
          onEditNames={onEditNames}
          setOnEditNames={setOnEditNames}
          data={authInfo.data}
          userData={authInfo.data}
        />
      ) : (
        <ComfrimEmailView data={authInfo.data} />
      )}
    </>
  );
}

export default Profile;
