import React from "react";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";
import axios from "axios";

export default function HomePage() {
  const [videoInfo, setVideoInfo] = React.useState({});
  const [clcik, setClick] = React.useState(0);
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    async function randomVideo() {
      setShowLoader(true);
      await axios
        .get("https://api-quickvid.azurewebsites.net/fetchVideo")
        .then((response) => {
          //console.log(response.data);
          setVideoInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    randomVideo();
    setShowLoader(false);
  }, [clcik]);

  return (
    <div className="min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="home" />
      <div className="flex justify-end absolute md:w-2/3 lg:w-1/2 left-0 right-0 mx-auto p-10 ">
        {!showLoader ? (
          <div
            id="home-shuffle-btn"
            onClick={() => setClick((prev) => prev + 1)}
            className="flex p-2 bg-sky-500 hover:bg-sky-600 rounded-lg cursor-pointer"
          >
            <i className="bi bi-shuffle text-lg  text-white"></i>
            <p className="ml-3 font-bold text-lg text-white">Shuffle</p>
          </div>
        ) : (
          <div className="flex p-2 bg-gray-500 rounded-lg cursor-pointer">
            <i className="bi bi-shuffle text-lg  text-white"></i>
            <p className="ml-3 font-bold text-lg text-white">Shuffle</p>
          </div>
        )}
      </div>
      <VideoContainer
        key={videoInfo._id}
        info={videoInfo}
        username={videoInfo.username}
        index="1"
        page="home"
      />
    </div>
  );
}
