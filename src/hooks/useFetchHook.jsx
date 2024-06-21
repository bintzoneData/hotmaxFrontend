import { useState } from 'react';

export const useFetchMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return { ok: false, msg: 'CREDENTIALS FAILED', data: null };
  }
  const token = JSON.parse(authToken);
  const postData = async (url, method, body, delay) => {
    setIsLoading(true);
    // Simulate a delay
    if (delay && delay === true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      if (res.status === 401) {
        localStorage.clear();
        navigate('/login');
        return;
      }
      if (!res.ok) {
        const data = await res.json();

        const resData = {
          ok: false,
          message: data.message || 'could not fetch data',
        };
        setIsLoading(false);
        return resData;
      }
      const data = await res.json();

      const resData = {
        ok: true,
        data: data,
      };
      fetchUser();
      setIsLoading(false);

      return resData;
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
      const resData = {
        ok: false,
        message: 'server error or something went wrong',
      };
      return resData;
    }
  };

  return { postLoading, postData };
};
export const useFetch = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [fetchLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem('authToken');

  const token = JSON.parse(authToken);
  const fetchPrivateData = async (url) => {
    if (!authToken) {
      localStorage.removeItem('authToken');
      return { ok: false, msg: 'CREDENTIALS FAILED', data: null };
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}${url}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (res.status === 401) {
        localStorage.clear();
        navigate('/login');
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          message: data.message || 'could not post image',
        };
      }
      return {
        ok: true,
        data: data,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
      return {
        ok: false,
        message: 'server error or something went wrong',
      };
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}${url}`);
      if (res.status === 401) {
        localStorage.clear();
        navigate('/login');
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          message: data.message || 'could not post image',
        };
      }
      return {
        ok: true,
        data: data,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
      return {
        ok: false,
        message: 'server error or something went wrong',
      };
    } finally {
      setIsLoading(false);
    }
  };
  const postFetch = async (url, method, body) => {
    if (!authToken) {
      return { ok: false, data: null, msg: 'CREDENTIALS FAILED' };
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          data: null,
          msg: data.message || 'could not fetch data',
        };
      }
      return { ok: true, data: data };
    } catch (error) {
      //   console.error('Error fetching users:', error);
      const resData = {
        ok: false,
        message: 'server error or something went wrong',
      };
      return resData;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchLoading, fetchPrivateData, fetchData, postFetch };
};
