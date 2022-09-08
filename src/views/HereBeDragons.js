import React from 'react'
import NavBar from '../components/NavBar'

function HereBeDragons() {
  return (
    <div>
      <div className='home-banner'>
        <NavBar/>
      </div>
      <div className='content-container'>
        <br/>
        <h1>Here Be Dragons!</h1>
        <a className='explore-button' href='/'>Return to safety...</a>
      </div>
    </div>
  )
}

export default HereBeDragons