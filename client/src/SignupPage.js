import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import axios from "axios";

export default function SignupPage() {
  const [formdata, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfrim: "",
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
    // check if same email or username in database
    if (formdata.password === formdata.passwordConfrim) {
      axios.post('https://quickvidapp.azurewebsites.net/api/signUp', {
      username: formdata.username,
      email: formdata.email,
      password: formdata.password
      })
      console.log("Successfully signup!");
      console.log(formdata);
    } else {
      console.log("The password do not match!");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <div className="flex flex-col items-center w-5/6 md:w-1/3 p-5 rounded-lg bg-white">
        <img
          src={logo}
          alt="logo"
          className="justify-center w-1/3 md:w-1/5 mt-8"
        />
        <h1 className="mt-8 mb-4 text-4xl font-medium text-sky-500 ">
          Sign Up
        </h1>
        {/* method POST */}
        <form onSubmit={handleSubmit} className="w-full md:w-3/4">
          <div className="flex flex-col my-4">
            <h4 className="text-xl text-sky-500">Username</h4>
            <input
              className="h-9 pl-2 rounded-lg border-solid border-[1px] border-gray-300"
              type="username"
              placeholder="User Name"
              name="username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>

          <div className="flex flex-col my-4">
            <h4 className="text-xl text-sky-500">Email</h4>
            <input
              className="h-9 pl-2 rounded-lg border-solid border-[1px] border-gray-300"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
            />
          </div>

          <div className="flex flex-col my-4">
            <h4 className="text-xl text-sky-500">Password</h4>
            <input
              className="h-9 pl-2 rounded-lg border-solid border-[1px] border-gray-300"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formdata.password}
            />
          </div>

          <div className="flex flex-col mt-4 mb-8">
            <h4 className="text-xl text-sky-500">Confrim Password</h4>
            <input
              className="h-9 pl-2 rounded-lg border-solid border-[1px] border-gray-300"
              type="password"
              placeholder="Confrim Password"
              name="passwordConfrim"
              onChange={handleChange}
              value={formdata.passwordConfrim}
            />
          </div>
          <button className="w-full h-9 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
            Sign Up
          </button>
        </form>
        <span className="mb-8 text-sky-700 ">
          Already have an account? &nbsp;
          <a
            className="underline text-sky-700 cursor-pointer"
            onClick={() => navigateTo("/login")}
          >
            Log In
          </a>
        </span>
      </div>
    </div>
  );
}
