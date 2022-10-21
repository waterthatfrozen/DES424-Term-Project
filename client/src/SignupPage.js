import React from "react";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png'

export default function SignupPage(){
  const [formdata, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfrim: ""
  })

  const navigateTo = useNavigate();

  function handleChange(event){
    const {name, value} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }))
    // console.log(formdata)
  }

  function handleSubmit(event){
    event.preventDefault()
    // check if same email or username in database
    if(formdata.password === formdata.passwordConfrim){
      console.log("Successfully signup!")
      console.log(formdata)
    }else{
      console.log("The password do not match!")
    }  
  }

  return(
    <body>
      <div className='signin--container'>
        <img src={logo} alt="logo" className='align-item--center logo--img'/>
        <h1>Sign Up</h1>
        {/* method POST */}
        <form onSubmit={handleSubmit} className='form--container'>
          <div className='form--group'>
            <h4>Username</h4>
            <input className='form--input' type="username" placeholder='User Name' name='username' onChange={handleChange} value={formdata.username}/>
          </div>
          
          <div className='form--group'>
            <h4>Email</h4>
            <input className='form--input' type="email" placeholder='Email' name='email' onChange={handleChange} value={formdata.email}/>
          </div>

          <div className='form--group'>
            <h4>Password</h4>
            <input className='form--input' type="password" placeholder='Password' name='password' onChange={handleChange} value={formdata.password}/>
          </div>
          
          <div className='form--group'>
            <h4>Confrim Password</h4>
            <input className='form--input' type="password" placeholder='Confrim Password' name='passwordConfrim' onChange={handleChange} value={formdata.passwordConfrim}/>
          </div>
          <button className='form--btn'>Sign Up</button>
        </form>
        <span className='span--signup'>
            Already have an account? &nbsp;
            <a className="a--signup" onClick={() => navigateTo("/")}>Sign In</a>
          </span>
      </div>
    </body>
  )
}