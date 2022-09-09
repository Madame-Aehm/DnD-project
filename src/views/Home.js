import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function Home() {

  const { user, logout } = useContext(AuthContext);

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
            <Link className='explore-button' to='/login'>Login</Link>
            <p>No account? <Link to='signup'>Sign up</Link>!</p>
          </div>
        }
        <Link className='explore-button' to='/explore'>Explore</Link>
        {user && 
        <>
          <Link className='explore-button' to={'/favourites'}>My Favourites</Link>
          <Link className='explore-button' to={'/characters'}>My Characters</Link>
          <br/>
          <a className='explore-button' onClick={logout}>Logout</a>
        </>}
      </div>
    </div>
  )
}

export default Home