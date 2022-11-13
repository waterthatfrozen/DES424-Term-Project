import React from "react";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";
import axios from "axios";

export default function HomePage() {
  const [videoInfo, setVideoInfo] = React.useState({});
  const [userVideoContainer, setUserVideoContainer] = React.useState()

  React.useEffect(() => {
    async function randomVideo(){
      await axios.get("https://api-quickvid.azurewebsites.net/fetchVideo")
      .then((response) => {
        console.log(response.data);
        setVideoInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    randomVideo()

    setUserVideoContainer(
      <VideoContainer
          key={videoInfo._id}
          info={videoInfo}
      />
    )
  },[])

  return (
    <div className="min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="home" />
      {userVideoContainer}
    </div>
  );
}
