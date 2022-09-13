import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function SignUp() {

  const { registerNewUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const toLogin = () => navigate("/login", {replace: true});

  const handleRegister = (email, password) => {
    registerNewUser(email, password);
  }
 
  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Sign Up!</h1>
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
                handleRegister(emailInput.value, passwordInput.value);
              }
            }}>Sign up!</a>
            <p>Already have an account? <a onClick={toLogin} style={({cursor: "pointer"})}>Log-in</a>!</p>
          </div>
        </div>
    </div>
  )
}

export default SignUp