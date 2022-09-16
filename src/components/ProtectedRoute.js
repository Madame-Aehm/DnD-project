import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, extraCheck } = useContext(AuthContext);
  return (
    <>
      {extraCheck ? <p>Access to this page is restricted to logged-in users only.</p> : user ? children : <Navigate to="/login"/>}
    </>
  )
}

export default ProtectedRoute