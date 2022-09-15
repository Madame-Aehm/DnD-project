import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function SignUp() {

  const { registerNewUser } = useContext(AuthContext);

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
            <button className='explore-button' onClick={ () => {
              const emailInput = document.querySelector("#email");
              const passwordInput = document.querySelector("#password");
              const validEmail = emailValidation(emailInput);
              const validPassword = passwordValidation(passwordInput);
              if (validEmail && validPassword) {
                handleRegister(emailInput.value, passwordInput.value);
              }
            }}>Sign up!</button>
            <p>Already have an account? <Link to={"/login"} replace={true} style={({cursor: "pointer"})}>Log-in</Link>!</p>
          </div>
        </div>
    </div>
  )
}

export default SignUp