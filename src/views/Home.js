import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function Home() {

  const { user, setUser, login, logout } = useContext(AuthContext);

  return (
    <div>
      <div className='home-banner'>
        <NavBar />
      </div>
      <div className='content-container'>
        <br/>
        <h1>Welcome</h1>
        {!user && 
          <div className='login-signup'>
            <a className='explore-button' href='/login'>Login</a>
            <p>No account? <a href='signup'>Sign up</a>!</p>
          </div>
        }
        <a className='explore-button' href='/explore'>Explore</a>
        {user && <a className='explore-button' onClick={logout}>Logout</a>}
      </div>
    </div>
  )
}

export default Home