import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
// https://reactrouter.com/en/main/hooks/use-navigation#navigationlocation tell when the form is submit where is the next location

export default function LoginPage() {
  const [formdata, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const navigateTo = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // console.log(formdata)
  }

  function handleSubmit(event) {
    event.preventDefault();
    // check username and password in database
    console.log("Successfully login!");
    console.log(formdata);
  }

  function forgetPassword() {
    alert("Please email to 6222782425@g.siit.tu.ac.th");
  }

  return (
    <body>
      <div className="signin--container">
        <img src={logo} alt="logo" className="align-item--center logo--img" />
        <h1>Sign In</h1>
        {/* method POST */}
        <form onSubmit={handleSubmit} className="form--container">
          <div className="form--group">
            <h4>Username</h4>
            <input
              className="form--input"
              type="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>

          <div className="form--group">
            <h4>Password</h4>
            <input
              className="form--input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formdata.password}
            />
            <a onClick={forgetPassword} className="a--password">
              Forget a password?
            </a>
          </div>

          <button className="form--btn">Sign In</button>
        </form>
        <span className="span--signup">
          Doesn't have an account? &nbsp;
          <a className="a--signup" onClick={() => navigateTo("/signup")}>
            Sign Up
          </a>
        </span>
      </div>
    </body>
  );
}
