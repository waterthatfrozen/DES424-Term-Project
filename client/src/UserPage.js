import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";
import axios from "axios";

export default function UserPage() {
  const navigateTo = useNavigate();
  const userInfo = {
    username: sessionStorage.getItem("user-name"),
    userID: sessionStorage.getItem("user-id"),
  };
  const [userVideoList, setUserVideoList] = React.useState();

  React.useEffect(() => {
    async function getUserVideo() {
      await axios
        .get(
          `https://api-quickvid.azurewebsites.net/listUserVideo?userID=${userInfo.userID}`
        )
        .then((response) => {
          //console.log(response.data);
          setUserVideoList(response.data.videos);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (userInfo.username) {
      getUserVideo();
    }
    // eslint-disable-next-line
  }, []);

  function createVideoContainer() {
    let card = userVideoList.map((info, index) => {
      return (
        <VideoContainer
          key={info._id}
          info={info}
          username={userInfo.username}
          index={index}
          showBin="true"
          streamingPath={info.streamingPath}
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
    // eslint-disable-next-line
  }, [navigateTo]);

  function logOut() {
    sessionStorage.setItem("user-name", null);
    sessionStorage.setItem("user-id", null);
  }

  return (
    <div className="flex flex-col min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="user" />

      <div className="flex justify-center">
        <div className="flex justify-between w-4/5 md:w-2/3 lg:w-1/2 py-10 mb-3 border-solid border-b-2 border-[#e8eded]">
          <div className="flex">
            <div className={`w-16 h-16 rounded-full bg-slate-200`}>
              <p className="flex items-center justify-center h-full text-5xl font-bold text-neutral-800 ">
                {userInfo.username[0].toUpperCase()}
              </p>
            </div>
            <div>
              <h2 className="self-center ml-5 text-3xl text-gray-80">
                {userInfo.username}
              </h2>
              <h3 className="self-center ml-5 text-lg text-gray-600">
                {userVideoList ? userVideoList.length : 0} Videos
              </h3>
            </div>
          </div>
          <div
            id="user-logout-btn"
            onClick={() => {
              logOut();
              navigateTo("/login");
            }}
            className="flex items-center cursor-pointer"
          >
            <div className="flex p-2 bg-red-800 rounded-lg">
              <i className="bi bi-box-arrow-in-right mr-2 md:text-lg  text-white"></i>
              <p className="invisible md:visible absolute md:static ml-3 font-bold text-lg text-white">
                {" "}
                Log out
              </p>
            </div>
          </div>
        </div>
      </div>
      {userVideoList && createVideoContainer()}
    </div>
  );
}
