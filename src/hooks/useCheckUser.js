import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

function useCheckUser() {
  const { user } = useContext(AuthContext);
  const userBoolean = user !== null ? true : false;
  return userBoolean;
}

export default useCheckUser