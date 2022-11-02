import React from "react";
import logo from "../assets/logo.png";
// import home from "../assets/home.png";
import homeC from "../assets/home-click.png";
// import upload from "../assets/upload.png";
import uploadC from "../assets/upload-click.png";
// import user from "../assets/user.png";
import userC from "../assets/user-click.png";

export default function Navbar() {
  return (
    <div className="flex justify-between sticky w-full h-[90px] top-0 p-3 pl-10 pr-10 z-10 bg-white">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="self-center w-[50px] h-[50px]" />
      </div>
      <div className="grid grid-cols-3 gap-8">
        <img src={homeC} alt="home" className="self-center w-[30px] h-[30px]" />
        <img
          src={uploadC}
          alt="upload"
          className="self-center w-[30px] h-[30px]"
        />
        <img src={userC} alt="user" className="self-center w-[30px] h-[30px]" />
      </div>
    </div>
  );
}
