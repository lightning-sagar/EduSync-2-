import React, {  useState } from 'react'
import './Login.css'
import cross_icon from './../../assets/cross_icon.png'
const LoginPopUp = ({setShowLogin }) => {

  const [currentState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;

    const value = event.target.value;
    //console.log(`Input changed: ${name} = ${value}`); // Debug statement
    setData(data => ({ ...data, [name]: value }))
  }

  return (
    <div className='login-popup'>
      <form  className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name ' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email ' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password ' required />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login"
          ? <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}
export default LoginPopUp