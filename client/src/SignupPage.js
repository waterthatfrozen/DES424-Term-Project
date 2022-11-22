import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import axios from "axios";
import md5 from "md5";
import spinner from "./assets/spinner.gif";

export default function SignupPage() {
  const navigateTo = useNavigate();
  const [formdata, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfrim: "",
  });
  const [vaildPassword, setVaildPassword] = React.useState("");
  const [submitOnce, setSubmitOnce] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [vaildForm, setVaildForm] = React.useState(false);
  const [vaildEmail, setVaildEmail] = React.useState();

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

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitOnce(true);
    submitUserInfo();
  }

  async function submitUserInfo() {
    console.log(vaildForm);
    if (vaildForm) {
      setShowLoader(true);
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
        if (error.response.status !== 500) {
          alert(error.response.data.message);
        }
      }
      setShowLoader(false);
    }
  }

  React.useEffect(() => {
    function handlePssswordInput() {
      if (formdata.password.length < 8) {
        setVaildPassword("invaild");
        submitOnce && setVaildPassword("Password is too short");
      } else if (formdata.password !== formdata.passwordConfrim) {
        setVaildPassword("invaild");
        submitOnce && setVaildPassword("Password do not match");
      }
      if (
        formdata.password.length >= 8 &&
        formdata.password === formdata.passwordConfrim
      ) {
        setVaildPassword("vaild");
      }
    }

    function checkForm() {
      if (
        formdata.username &&
        formdata.email &&
        formdata.password &&
        vaildPassword === "vaild"
      ) {
        handleEmail(formdata.email);
        // return setVaildForm(true);
      } else {
        return setVaildForm(false);
      }
    }

    function handleEmail(input) {
      let domainName = "";
      if (input.includes(" ")) {
        setVaildEmail(false);
        return setVaildForm(false);
      }

      if (input[0] !== "." && input[input.length - 1] !== ".") {
        for (let i = 0; i < input.length; i++) {
          if (input[i] === "@") {
            domainName = input.slice(i + 1, input.length - 1);
            break;
          }
        }

        if (!domainName.includes(".")) {
          setVaildEmail(false);
          return setVaildForm(false);
        }
        setVaildEmail(true);
        return setVaildForm(true);
      } else {
        setVaildEmail(false);
        return setVaildForm(false);
      }
    }
    handlePssswordInput();
    checkForm();
  }, [formdata, vaildPassword, submitOnce]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <div className="flex flex-col items-center w-5/6 md:w-2/5 lg:w-1/3 p-3 rounded-lg bg-white">
        <img
          src={logo}
          alt="logo"
          className="justify-center w-1/5 mt-8 md:mt-3"
        />
        <h1 className="mt-8 mb-4 text-3xl font-medium text-sky-500 ">
          Sign Up
        </h1>
        {/* method POST */}
        <form onSubmit={handleSubmit} className="w-3/4">
          <div className="flex flex-col my-4">
            <h4 className="text-xl text-sky-500">Username</h4>
            <input
              id="signup-username-input"
              disabled={showLoader}
              className={`
              h-9 pl-2 rounded-lg border-solid border-[1px] ${
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
              id="signup-email-input"
              disabled={showLoader}
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
              id="signup-password-input"
              disabled={showLoader}
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
              id="signup-confrim-password-input"
              disabled={showLoader}
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
            {vaildPassword !== "vaild" && vaildPassword !== "invaild" && (
              <p className="self-end text-red-800">{vaildPassword}</p>
            )}
            {submitOnce &&
              (!formdata.username || !formdata.email || !formdata.password) && (
                <p className="self-end text-red-800">
                  Please input all information!
                </p>
              )}
            {vaildEmail === false && submitOnce && (
              <p className="self-end text-red-800">Please input vaild email!</p>
            )}
          </div>
          {!showLoader ? (
            <button
              id="signup-signup-btn"
              className="w-full h-9 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500"
            >
              Sign Up
            </button>
          ) : (
            <button
              disabled
              className="flex justify-center w-full h-9 mb-4 rounded-xl bg-[#f1f2f3]"
            >
              <img src={spinner} alt="spinner" className="h-9" />
            </button>
          )}
        </form>
        <span className="flex text-sky-700 ">
          Already have an account? &nbsp;
          <p
            className="underline text-sky-700 cursor-pointer"
            id="signup-login-hyperlink"
            onClick={() => {
              if (!showLoader) {
                navigateTo("/login");
              }
            }}
          >
            Log In
          </p>
        </span>
      </div>
    </div>
  );
}
