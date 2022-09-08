import React from 'react'
import NavBar from '../components/NavBar'

function Login() {



  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Login</h1>
        <form action={"login-success"} >
          <input type={"text"} placeholder={"Email"} name={"email"} required></input>
          <input type={"password"} placeholder={"Password"} name={"password"} required></input>
          <button type={"submit"}>Login</button>
        </form>
        <p>No account? <a href='signup'>Sign up</a>!</p>
    </div>
  )
}

export default Login