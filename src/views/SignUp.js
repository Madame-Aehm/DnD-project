import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function SignUp() {

  const { registerNewUser } = useContext(AuthContext);
  const [passwordType, setPasswordType] = useState("password");
  const [showOrHide, setShowOrHide] = useState("show");

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowOrHide("Hide")
      return;
    }
    setPasswordType("password");
    setShowOrHide("Show");
  }

  const handleRegister = (email, password) => {
    registerNewUser(email, password);
  }
 
  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Sign Up!</h1>
      <div className='form'>
          <input className='log-input' type={"text"} placeholder={"Email"} id={"email"} required></input>
          <input className='log-input' type={passwordType} placeholder={"Password"} id={"password"} required></input>
          <p onClick={togglePasswordType} className='hide-password'>{showOrHide}</p>
          <div className='login-signup move-up'>
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