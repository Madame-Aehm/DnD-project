import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReturnToTop from './ReturnToTop';


function NavBar() {
    
  const navigate = useNavigate();
  const { user, logout, permDelete } = useContext(AuthContext);
  function closeMenu () {
    const menuCheckbox = document.querySelector("input[type='checkbox']");
    if (menuCheckbox.checked === true) {
      menuCheckbox.checked = false;
    }
  }
  window.onclick = () => closeMenu();
  
  return (
      <div id='nav-container'>
          <div className='nav-links'>
            <a className='hide' onClick={() => navigate(-1)}>Back</a>

            <div className='menu' onClick={(e) => e.stopPropagation()}>
              <input type={"checkbox"} id={"menu-toggle"}/>
              <label htmlFor={"menu-toggle"}>
                <a className='hide'>Menu</a>
              </label>
              <div className='close-menu'></div>
              {!user && 
                <ul className='not-logged'>
                  <NavLink to={"/explore"} style={({isActive}) => ({
                    opacity: isActive ? 0.5 : 1,
                    cursor: isActive ? "inherit" : "pointer"
                  })}><li>Explore</li></NavLink>
                  <NavLink to={"/login"} style={({isActive}) => ({
                    opacity: isActive ? 0.5 : 1,
                    cursor: isActive ? "inherit" : "pointer"
                  })}><li>Login</li></NavLink>
                </ul>
              }
              {user && 
                <ul className='logged'>
                  <NavLink to={"/explore"} style={({isActive}) => ({
                    opacity: isActive ? 0.5 : 1,
                    cursor: isActive ? "inherit" : "pointer"
                  })}><li>Explore</li></NavLink>
                  <NavLink to={"/favourites"} style={({isActive}) => ({
                    opacity: isActive ? 0.5 : 1,
                    cursor: isActive ? "inherit" : "pointer"
                  })}><li>Favourites</li></NavLink>
                  <NavLink to={"/characters"} style={({isActive}) => ({
                    opacity: isActive ? 0.5 : 1,
                    cursor: isActive ? "inherit" : "pointer"
                  })}><li>Characters</li></NavLink>
                  <a><li onClick={logout}>Logout</li></a>
                  <a><li onClick={permDelete}>Delete Account</li></a>
                </ul>
              }
            </div>
          </div>
          {user && <a href='/'><img src='images/d20++.png' alt='D20 dice icon'/></a>}
          {!user && <a href='/'><img src='images/d20+.png' alt='D20 dice icon'/></a>}

          <ReturnToTop />
          {/* {window.onclick = () => closeMenu()} */}
      </div>
  )
}

export default NavBar