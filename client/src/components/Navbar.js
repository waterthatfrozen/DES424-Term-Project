import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import home from "../assets/home.png";
import homeC from "../assets/home-click.png";
import upload from "../assets/upload.png";
import uploadC from "../assets/upload-click.png";
import user from "../assets/user.png";
import userC from "../assets/user-click.png";

export default function Navbar(props) {
  const navigateTo = useNavigate();

  function changePage(path) {
    const getUserId = sessionStorage.getItem("user-id");
    if (path !== "home") {
      console.log(getUserId);
      if (
        getUserId === undefined ||
        getUserId === null ||
        getUserId === "undefined"
      ) {
        navigateTo("/login");
      } else {
        navigateTo(`/${path}`);
      }
    } else {
      navigateTo("/");
    }
  }

  return (
    <div className="flex justify-between sticky w-full h-[90px] top-0 p-3 pl-10 pr-10 z-10 bg-white">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="self-center w-[50px] h-[50px]" />
      </div>
      <div className="grid grid-cols-3 gap-8">
        <img
          src={props.page === "home" ? homeC : home}
          alt="home"
          onClick={() => {
            changePage("home");
          }}
          className="self-center w-[35px] h-[35px] cursor-pointer"
        />
        <img
          src={props.page === "upload" ? uploadC : upload}
          alt="upload"
          onClick={() => {
            changePage("upload");
          }}
          className="self-center w-[35px] h-[35px] cursor-pointer"
        />
        <img
          src={props.page === "user" ? userC : user}
          alt="user"
          onClick={() => {
            changePage("user");
          }}
          className="self-center w-[35px] h-[35px] cursor-pointer"
        />
      </div>
    </div>
  );
}
