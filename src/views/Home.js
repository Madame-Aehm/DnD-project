import React from 'react'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <div>
      <div className='home-banner'>
        <NavBar />
      </div>
      <div className='home-container'>
        <h1>Welcome</h1>
        <div className='login-signup'>
          <a href='/login'>Login</a>
          <p>No account? Sign up!</p>
        </div>
        <a href='/explore'>Explore</a>
      </div>
    </div>
  )
}

export default Home