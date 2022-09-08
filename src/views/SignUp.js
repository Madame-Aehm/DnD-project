import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function SignUp() {

  const { registerNewUser } = useContext(AuthContext);


  const redirect = useNavigate();
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
          <a className='explore-button' onClick={ () => {
            const emailInput = document.querySelector("#email");
            const passwordInput = document.querySelector("#password");
            const validEmail = emailValidation(emailInput);
            const validPassword = passwordValidation(passwordInput);
            if (validEmail && validPassword) {
              alert("validation success");
              handleRegister(emailInput.value, passwordInput.value);
            }
          }}>Sign up!</a>
        </div>
    </div>
  )
}

export default SignUp