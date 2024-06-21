import { useState, useCallback } from 'react';

const useSmallNotify = () => {
  const [smallNotify, setSmallNotify] = useState({
    msg: '',
    type: 'success',
    show: true,
    time: 3000,
  });
  return {
    smallNotify,
    setSmallNotify,
  };
};

export default useSmallNotify;
