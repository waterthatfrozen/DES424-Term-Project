import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import axios from "axios";
import md5 from "md5";

export default function SignupPage() {
  const navigateTo = useNavigate();
  const [formdata, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfrim: "",
  });
  const [vaildPassword, setVaildPassword] = React.useState("vaild");
  const [submitOnce, setSubmitOnce] = React.useState(false);
  const [isVaildForm, setIsVaildForm] = React.useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    const setInfo = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    if (name !== "email" && value.length < 21) {
      setInfo();
    } else if (name === "email") {
      setInfo();
    }
  }

  function handlePssswordInput() {
    if (formdata.password.length < 8) {
      setVaildPassword("Password is too short");
    } else if (formdata.password !== formdata.passwordConfrim) {
      setVaildPassword("Password do not match");
    } else {
      setVaildPassword("vaild");
    }
  }

  let vaildForm = () => {
    handlePssswordInput();
    return (
      formdata.username &&
      formdata.email &&
      formdata.password &&
      vaildPassword === "vaild"
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formdata.username);
    setSubmitOnce(true);
    setIsVaildForm(vaildForm());
    if (vaildForm()) {
      try {
        await axios
          .post("https://api-quickvid.azurewebsites.net/signUp", {
            username: formdata.username,
            email: formdata.email,
            password: md5(formdata.password),
          })
          .then(() => {
            navigateTo("/login");
            alert("Sign up successfully");
          });
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <div className="flex flex-col items-center w-5/6 md:w-1/3  p-3 rounded-lg bg-white">
        <img
          src={logo}
          alt="logo"
          className="justify-center w-1/3 md:w-1/5 mt-8 md:mt-3"
        />
        <h1 className="mt-8 mb-4 text-3xl font-medium text-sky-500 ">
          Sign Up
        </h1>
        {/* method POST */}
        <form onSubmit={handleSubmit} className="w-full md:w-3/4">
          <div className="flex flex-col my-4">
            <h4 className="text-xl text-sky-500">Username</h4>
            <input
              className={`h-9 pl-2 rounded-lg border-solid border-[1px] ${
                submitOnce && !formdata.username
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
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
              className={`h-9 pl-2 rounded-lg border-solid border-[1px] ${
                submitOnce && !formdata.email
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
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
              className={`h-9 pl-2 rounded-lg border-solid border-[1px] ${
                (vaildPassword !== "vaild" || !formdata.password) && submitOnce
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
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
              className={`h-9 pl-2 rounded-lg border-solid border-[1px] ${
                vaildPassword === "Password do not match"
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              type="password"
              placeholder="Confrim Password"
              name="passwordConfrim"
              onChange={handleChange}
              value={formdata.passwordConfrim}
            />
            {vaildPassword !== "vaild" && (
              <p className="self-end text-red-800">{vaildPassword}</p>
            )}
            {submitOnce && !isVaildForm && (
              <p className="self-end text-red-800">
                Please input all information!
              </p>
            )}
          </div>
          <button className="w-full h-9 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
            Sign Up
          </button>
        </form>
        <span className="flex text-sky-700 ">
          Already have an account? &nbsp;
          <p
            className="underline text-sky-700 cursor-pointer"
            onClick={() => navigateTo("/login")}
          >
            Log In
          </p>
        </span>
      </div>
    </div>
  );
}
