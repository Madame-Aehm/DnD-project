import React, { useContext, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';

function Login() {

  const redirect = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (email, password) => {
    login(email, password);
  }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Login</h1>
        <div className='form'>
          <input className='log-input' type={"text"} placeholder={"Email"} id={"email"} required></input>
          <input className='log-input' type={"password"} placeholder={"Password"} id={"password"} required></input>
          <a className='explore-button' onClick={ () => {
          const emailInput = document.querySelector("#email");
          const passwordInput = document.querySelector("#password");
          const validEmail = emailValidation(emailInput);
          const validPassword = passwordValidation(passwordInput);
          if (validEmail && validPassword) {
            alert("validation success");
            handleLogin(emailInput.value, passwordInput.value);
            }
          }}>Login</a>
        </div>
        <p>No account? <a href='signup'>Sign up</a>!</p>
    </div>
  )
}

export default Login