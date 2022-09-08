import React from 'react'
import NavBar from '../components/NavBar'

function LogInSuccess() {
  return (
    <div>
      <div className='home-banner'>
        <NavBar/>
      </div>
      <div className='content-container'>
        <br/>
        <h1>Successfully logged in!</h1>
        <a className='explore-button' href='/'>Return Home</a>
      </div>
      
    </div>
  )
}

export default LogInSuccess