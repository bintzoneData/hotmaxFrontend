import { createContext, useEffect, useLayoutEffect, useState } from 'react';

const AuthContext = createContext(); // Correctly call createContext()

const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [odersData, setOdersData] = useState([]);
  const fetchClient = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setLoggedIn(false);
      setAuthLoading(false);
      return;
    }

    const token = JSON.parse(authToken);

    setAuthLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/clients/me`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you send the token as a Bearer token
          },
          credentials: 'include',
        }
      );
      if (response.status === 401) {
        setLoggedIn(false);
        setAuthLoading(false);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        setLoggedIn(true);
      } else {
        setUserData({
          name: '',
          surname: '',
          email: '',
          phone: '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch client data:', error);
    } finally {
      setAuthLoading(false);
    }
  };
  useLayoutEffect(() => {
    fetchClient();
  }, []);
  if (authLoading) return null;
  return (
    <AuthContext.Provider
      value={{
        authLoading,
        setAuthLoading,
        isLoggedIn,
        userData,
        fetchClient,
        setLoggedIn,
        odersData,
        setOdersData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
