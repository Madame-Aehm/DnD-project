import React from 'react'
import NavBar from '../components/NavBar'

function Home() {

  return (
    <div>
      <div className='home-banner'>
        <NavBar />
      </div>
      <div className='content-container'>
        <h1>Welcome</h1>
        <div className='login-signup'>
          <a className='explore-button' href='/login'>Login</a>
          <p>No account? <a href='signup'>Sign up</a>!</p>
        </div>
        <a className='explore-button' href='/explore'>Explore</a>
      </div>
    </div>
  )
}

export default Home