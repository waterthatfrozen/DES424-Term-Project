import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";
import mockJson from "./json/mockupAPI.json";

export default function UserPage() {
  const navigateTo = useNavigate();
  const userList = mockJson;
  const userInfo = {
    username: sessionStorage.getItem("user-name"),
    userID: sessionStorage.getItem("user-id"),
  };

  // let randomColor = `bg-[${Math.floor(Math.random() * 16777215).toString(16)}]`;

  function createVideoContainer() {
    let card = userList.userInfo.map((info) => {
      return (
        <VideoContainer
          key={info.id}
          info={info}
          userName={info.username}
          userImg={info.userImg}
          showBin={true}
        />
      );
    });
    return card;
  }

  React.useEffect(() => {
    if (
      userInfo.userID === undefined ||
      userInfo.userID === null ||
      userInfo.userID === "undefined"
    ) {
      navigateTo("/login");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="user" />

      <div className="flex justify-center">
        <div className="flex md:w-1/2 py-10 mb-3 border-solid border-b-2 border-[#e8eded]">
          <div className={`w-16 h-16 rounded-full bg-slate-200`}>
            <p className="flex items-center justify-center h-full text-5xl font-bold text-neutral-800 ">
              {userInfo.username[0].toUpperCase()}
            </p>
          </div>
          <div>
            <h2 className="self-center ml-5 text-3xl text-gray-80">
              {userInfo.username}
            </h2>
            <h3 className="self-center ml-5 text-lg text-gray-600">2 Videos</h3>
          </div>
        </div>
      </div>
      {createVideoContainer()}
    </div>
  );
}
