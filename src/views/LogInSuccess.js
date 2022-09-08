import React from 'react'
import NavBar from '../components/NavBar'

function LogInSuccess() {
  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Successfully logged in!</h1>
      <a className='explore-button' href='/'>Return Home</a>
    </div>
  )
}

export default LogInSuccess