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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <div className="flex flex-col items-center w-5/6 md:w-1/3 p-5 rounded-lg bg-white">
        <img
          src={logo}
          alt="logo"
          className="justify-center w-1/3 md:w-1/5 mt-8"
        />
        <h1 className="mt-8 mb-4 text-4xl font-medium text-sky-500">Log In</h1>

        {/* method POST */}
        <form onSubmit={handleSubmit} className="w-full md:w-3/4">
          <div className="flex flex-col my-4">
            <h4 className="text-xl text-sky-500">Username</h4>
            <input
              className="h-9 pl-2 rounded-lg border-solid border-[1px] border-gray-300"
              type="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>

          <div className="flex flex-col">
            <h4 className="text-xl text-sky-500">Password</h4>
            <input
              className="h-9 pl-2 rounded-lg border-solid border-[1px] border-gray-300"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formdata.password}
            />
            <a
              onClick={forgetPassword}
              className="self-end mb-8 text-sky-700 cursor-pointer"
            >
              Forget a password?
            </a>
          </div>

          <button className="w-full h-9 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
            Sign In
          </button>
        </form>
        <span className="mb-8 text-sky-700">
          Doesn't have an account? &nbsp;
          <a
            className="underline text-sky-700 cursor-pointer"
            onClick={() => navigateTo("/signup")}
          >
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
}
