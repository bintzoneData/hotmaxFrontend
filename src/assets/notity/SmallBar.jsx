import React, { useContext, useEffect } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { MainContext } from '../../context/MainContext';

const SmallBar = ({}) => {
  const { smallNotify, setSmallNotify } = useContext(MainContext);
  const { show, msg, type, time } = smallNotify;
  const onClose = () => {
    setSmallNotify((prev) => ({ ...prev, show: false }));
  };
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setSmallNotify((prev) => ({ ...prev, show: false }));
      }, time);
    }
  }, [show, time]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className='flex'>
            <section
              className={`${
                type === 'success'
                  ? 'bg-[green]'
                  : type === 'warn'
                  ? 'bg-[#b67906]'
                  : type === 'error'
                  ? 'bg-[red]'
                  : 'bg-[#5ad0ee]'
              } rounded-sm text-white p-2 h-[30px] flex items-center gap-2`}
            >
              <p>{msg || 'undefined'}</p>
              <FaWindowClose
                onClick={onClose}
                className='cursor-pointer hover:text-[#bab1b1]'
              />
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmallBar;
