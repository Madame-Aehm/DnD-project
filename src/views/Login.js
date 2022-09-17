import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { user, login, logout } = useContext(AuthContext);
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
              <input type={passwordType} placeholder={"Password"} id={"password"} required></input>
              <p onClick={togglePasswordType} className='hide-password'>{showOrHide}</p>
              <div className='login-signup move-up'>
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