import React from 'react'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    
  const navigate = useNavigate();
  


  return (
    <div id='nav-container'>
        <div className='nav-links'>
        <a className='hide' onClick={() => navigate(-1)}>Back</a>
        <a className='hide'>Menu</a>
        </div>
        <a href='/'><img src='images/d20+.png' alt='D20 dice icon'/></a>
    </div>
  )
}

export default NavBar