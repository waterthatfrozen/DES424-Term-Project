import React from "react";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";
import userImg from "./assets/user-img.jpeg";
import mockJson from "./json/mockupAPI.json";

export default function UserPage() {
  const userList = mockJson;

  function createVideoContainer() {
    let card = userList.userInfo.map((info) => {
      return (
        <VideoContainer
          key={info.id}
          info={info}
          userName={info.username}
          userImg={info.userImg}
        />
      );
    });
    return card;
  }

  return (
    <div className="flex flex-col min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="user" />

      <div className="flex justify-center">
        <div className="flex md:w-1/2 py-10 mb-3 border-solid border-b-2 border-[#e8eded]">
          <img
            src={userImg}
            alt="user_img"
            className=" w-16 h-16 object-cover rounded-full"
          />
          <div>
            <h2 className="self-center ml-5 text-3xl text-gray-80">
              User Name
            </h2>
            <h3 className="self-center ml-5 text-lg text-gray-600">2 Videos</h3>
          </div>
        </div>
      </div>
      {createVideoContainer()}
    </div>
  );
}
