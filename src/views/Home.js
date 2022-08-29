import React from 'react'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <div className='home-container'>
      <NavBar />
      <h1>Welcome</h1>
      <div className='login-signup'>
        <a href='/login'>Login</a>
        <p>No account? Sign up!</p>
      </div>
      <a href='/explore'>Explore</a>
    </div>
  )
}

export default Home