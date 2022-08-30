import React from 'react'

function NavBar() {
   


  return (
    <div id='nav-container'>
        <div className='nav-links'>
        <a className='hide' href="javascript:history.back()">Back</a>
        <a className='hide'>Menu</a>
        </div>
        <a href='/'><img src='images/d20+.png' alt='D20 dice icon' /></a>
    </div>
  )
}

export default NavBar