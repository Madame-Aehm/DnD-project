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

  const validateAndRegister = () => {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const validEmail = emailValidation(emailInput);
    const validPassword = passwordValidation(passwordInput);
    if (validEmail && validPassword) {
      registerNewUser(emailInput.value.trim(), passwordInput.value);
    }
  }

  function hitEnter(e) {
    if (e.key === "Enter") {
      validateAndRegister();
    }
  }
 
  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Sign Up!</h1>
      <div className='form'>
          <input className='log-input' type={"text"} placeholder={"Email"} id={"email"} onKeyPress={(e) => hitEnter(e)} required></input>
          <input className='log-input' type={passwordType} placeholder={"Password"} id={"password"} onKeyPress={(e) => hitEnter(e)} required></input>
          <p onClick={togglePasswordType} className='hide-password'>{showOrHide}</p>
          <div className='login-signup move-up'>
            <button className='explore-button' onClick={ () => {validateAndRegister()}}>Sign up!</button>
            <p>Already have an account? <Link to={"/login"} replace={true} style={({cursor: "pointer"})}>Log-in</Link>!</p>
          </div>
        </div>
    </div>
  )
}

export default SignUp