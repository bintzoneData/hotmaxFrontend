import { Button } from '@mui/material';
import { Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import FormSpinner from '../../../assets/spinners/FormSpinner';
import { Fsm } from '../../../context/Fsm';
import { useFetch } from '../../../hooks/useFetchHook';
function EditNames({ data, onEditNames, setOnEditNames }) {
  const { authInfo } = useContext(Fsm);
  const { postFetch, fetchLoading } = useFetch();
  const [formData, setFormData] = useState({
    name: data?.name || '',
    surname: data?.surname || '',
  });
  const [errorForm, setErrorForm] = useState({ type: '', msg: '' });
  const { name, surname } = formData;
  const onMutate = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const onClose = () => {
    setOnEditNames(false);
    setFormData({ name: data?.name || '', surname: data?.surname || '' });
  };
  const onSubmit = async () => {
    if (!name || !surname) {
      setErrorForm({ type: 'all', msg: 'both fields are required' });
      return;
    }
    const response = await postFetch(`/clients/updateProfile`, 'PUT', {
      name,
      surname,
    });
    if (!response.ok) {
      setErrorForm({ type: 'all', msg: data.message || 'An error occurred' });
      return;
    }
    setOnEditNames(false);
  };
  return (
    <Modal
      okButtonProps={{ style: { display: 'none' } }} // Hide the OK button
      cancelButtonProps={{ style: { display: 'none' } }} // Hide the Cancel button
      className=''
      title={'Edit Profile'}
      open={onEditNames}
      onCancel={onClose}
      okText='Add address'
    >
      {fetchLoading && <FormSpinner />}
      <div className='flex flex-col gap-3 mt-5'>
        <Input
          placeholder='Enter your name'
          className='h-[40px] text-[18px] font-semibold'
          id='name'
          value={name}
          onChange={onMutate}
        />
        <Input
          placeholder='Enter your surname'
          className='h-[40px] text-[18px] font-semibold'
          id='surname'
          value={surname}
          onChange={onMutate}
        />
      </div>
      {errorForm.type === 'all' && (
        <p className='text-red-500'>{errorForm.msg}</p>
      )}
      <div className='flex justify-end mt-5'>
        <Button
          variant='contained'
          onClick={onSubmit}
          disabled={
            !data.name === '' ||
            !data.surname === '' ||
            name === '' ||
            surname === '' ||
            (name === data.name && surname === data.surname)
          }
        >
          update
        </Button>
      </div>
      {name === data.name && surname === data.surname && (
        <p className='text-[14px] text-[gray] '>
          <b className='text-black'>NB:</b> to update please make some changes
        </p>
      )}
    </Modal>
  );
}

export default EditNames;
