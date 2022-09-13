import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { user, login, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const toSignUp = () => navigate("/signup", {replace: true});

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
              <input className='log-input' type={"text"} placeholder={"Email"} id={"email"} required></input>
              <input className='log-input' type={"password"} placeholder={"Password"} id={"password"} required></input>
              <div className='login-signup'>
                <a className='explore-button' onClick={ () => {
                const emailInput = document.querySelector("#email");
                const passwordInput = document.querySelector("#password");
                const validEmail = emailValidation(emailInput);
                const validPassword = passwordValidation(passwordInput);
                if (validEmail && validPassword) {
                  handleLogin(emailInput.value, passwordInput.value);
                  }
                }}>Login</a>
                <p>No account? <a onClick={toSignUp} style={({cursor: "pointer"})}>Sign up</a>!</p>
              </div>
            </div>
          </>
        }
        
        
    </div>
  )
}

export default Login