import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';

function LogInSuccess() {
  const { user } = useContext(AuthContext);
  return (
    <div className='content-container'>
        <NavBar/>
        <br/>
        {user && <h1>Successfully logged in!</h1>}
        {!user && 
         <>
          <h1>Successfully logged out!</h1>
          <Link className='explore-button' to={"/login"} replace={true}>Log back in?</Link>
         </>
        }
        <Link className='explore-button' to='/' replace={true}>Return Home</Link>
      
    </div>
  )
}

export default LogInSuccess