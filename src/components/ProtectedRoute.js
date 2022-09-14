import React from 'react'
import { Navigate } from 'react-router-dom';
import useCheckUser from '../hooks/useCheckUser'

function ProtectedRoute({ children }) {
  const loggedIn = useCheckUser();
  return (
    <>
      {loggedIn ? children : 
        setTimeout(() => {
          <Navigate to="/login"/>
        }, 1000)
      }
    </>
  )
}

export default ProtectedRoute