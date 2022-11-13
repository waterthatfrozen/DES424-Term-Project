import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./assets/logo.png";
import md5 from "md5";
// https://reactrouter.com/en/main/hooks/use-navigation#navigationlocation tell when the form is submit where is the next location

export default function LoginPage(props) {
  const navigateTo = useNavigate();
  const [formdata, setFormData] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios
        .post("https://api-quickvid.azurewebsites.net/login", {
          username: formdata.username,
          password: md5(formdata.password),
        })
        .then((response) => {
          if (response.data.userLevel === "admin") {
            navigateTo("/admin-user");
          } else {
            props.userInfo({
              username: formdata.username,
              userID: response.data.userID,
            });
            navigateTo("/");
          }
        });
    } catch (error) {
      alert(error.response.data.message);
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
        <h1 className="mt-8 mb-4 text-4xl font-medium text-sky-500">Log In</h1>
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
            <p
              onClick={() =>
                alert("Please email to 6222782425@g.siit.tu.ac.th")
              }
              className="self-end mb-8 text-sky-700 cursor-pointer"
            >
              Forget a password?
            </p>
          </div>

          <button className="w-full h-9 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
            Sign In
          </button>
        </form>
        <span className="flex mb-8 text-sky-700">
          Doesn't have an account? &nbsp;
          <p
            className="underline text-sky-700 cursor-pointer"
            onClick={() => navigateTo("/signup")}
          >
            Sign Up
          </p>
        </span>
      </div>
    </div>
  );
}
