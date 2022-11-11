import React from "react";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";
import mockJson from "./json/mockupAPI.json";

export default function HomePage() {
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
    <div className="min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="home" />
      {createVideoContainer()}
    </div>
  );
}
