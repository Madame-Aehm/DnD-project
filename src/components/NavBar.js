import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
    
  const navigate = useNavigate();
  const { user, logout, permDelete } = useContext(AuthContext);
  


  return (
    <div id='nav-container'>
        <div className='nav-links'>
          <a className='hide' onClick={() => navigate(-1)}>Back</a>

          <div className='menu'>
            <input type={"checkbox"} id={"menu-toggle"}/>
            <label htmlFor={"menu-toggle"}>
              <a className='hide'>Menu</a>
            </label>
            {!user && 
              <ul className='not-logged'>
                <Link to={"/login"}><li>Login</li></Link>
              </ul>
            }
            {user && 
              <ul className='logged'>
                <Link to={"/favourites"}><li>Favourites</li></Link>
                <Link to={"/characters"}><li>Characters</li></Link>
                <a><li onClick={logout}>Logout</li></a>
                <a><li onClick={permDelete}>Delete Account</li></a>
              </ul>
            }
            
            
          </div>

        </div>
        {user && <a href='/'><img src='images/d20++.png' alt='D20 dice icon'/></a>}
        {!user && <a href='/'><img src='images/d20+.png' alt='D20 dice icon'/></a>}
    </div>
  )
}

export default NavBar