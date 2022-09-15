import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { user, login, logout } = useContext(AuthContext);

  const handleLogin = (email, password) => {
    login(email, password);
  }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Login</h1>
        {user && 
          <>
            <p>You're already logged in!</p>
            <button className='explore-button' onClick={logout}>Log out?</button>
          </>
        }
        {!user &&
          <>
            <div className='form'>
              <input type={"text"} placeholder={"Email"} id={"email"} required></input>
              <input type={"password"} placeholder={"Password"} id={"password"} required></input>
              <div className='login-signup'>
                <button className='explore-button' onClick={ () => {
                const emailInput = document.querySelector("#email");
                const passwordInput = document.querySelector("#password");
                const validEmail = emailValidation(emailInput);
                const validPassword = passwordValidation(passwordInput);
                if (validEmail && validPassword) {
                  handleLogin(emailInput.value, passwordInput.value);
                  }
                }}>Login</button>
                <p>No account? <Link to={"/signup"} replace={true} style={({cursor: "pointer"})}>Sign up</Link>!</p>
              </div>
            </div>
          </>
        }
        
        
    </div>
  )
}

export default Login