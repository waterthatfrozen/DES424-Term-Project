import React from "react";
import axios from "axios";
import heart from "../assets/heart.png";
import heartFill from "../assets/heart-fill.png";
import bin from "../assets/bin.png";
import { useNavigate } from "react-router-dom";

export default function VideoContainer(props) {
  const navigateTo = useNavigate();
  const [videoInfo, setVideoInfo] = React.useState(props.info);
  const currentUserID = sessionStorage.getItem("user-id");
  const [likeVideo, setLikeVideo] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const showBin = props.showBin;

  React.useEffect(() => {
    localStorage.setItem(`infoUser${props.index}`, JSON.stringify(videoInfo));
    // console.log(videoInfo.likedBy);
    if (videoInfo.likedBy) {
      let liked = videoInfo.likedBy.includes(currentUserID);
      setLikeVideo(liked);
    }
    setVideoInfo(props.info);
  }, [count]);

  function handleLike() {
    // console.log(currentUserID);
    if (
      currentUserID === null ||
      currentUserID === undefined ||
      currentUserID === "undefined"
    ) {
      alert("Please login to like the video");
    } else {
      handleSendLike();
    }
  }

  async function handleSendLike() {
    await axios
      .post("https://api-quickvid.azurewebsites.net/likeVideo", {
        userID: currentUserID,
        videoID: videoInfo._id,
      })
      .then(() => {
        // console.log(resp);
        setTimeout(() => {
          getVideoInfo();
        }, "1");
      })
      .catch((error) => console.log(error));
  }

  async function getVideoInfo() {
    await axios
      .get(
        `https://api-quickvid.azurewebsites.net/fetchVideo?videoID=${videoInfo._id}`
      )
      .then((resp) => {
        setVideoInfo((prev) => {
          return {
            ...prev,
            likedBy: resp.data.likedBy,
          };
        });
        let liked = resp.data.likedBy.includes(currentUserID);
        // console.log(resp.data.likedBy);
        setLikeVideo(liked);
      })
      .catch((error) => console.log(error));
  }

  async function deleteVideo() {
    await axios
      .delete(
        `https://api-quickvid.azurewebsites.net/deleteVideoAsset?videoID=${videoInfo._id}&userID=${currentUserID}`
      )
      .then(() => {
        navigateTo("/");
        alert("Delete video successfully");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col  md:w-2/3 lg:w-1/2 p-10  bg-white/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full bg-slate-200`}>
                <p className="flex items-center justify-center h-full text-5xl font-bold text-neutral-800 ">
                  {props.username ? props.username[0].toUpperCase() : "-"}
                </p>
              </div>
              <h2 className="w-40 lg:w-72 ml-5 text-xl text-gray-800 overflow-hidden text-ellipsis">
                {props.username}
              </h2>
            </div>

            {showBin && (
              <img
                src={bin}
                alt="bin"
                id="videocontainer-bin-icon"
                className="w-8 h-8 mr-3 cursor-pointer"
                onClick={() => deleteVideo()}
              />
            )}
          </div>

          <iframe
            title="videp player"
            src="videoPlayer.html"
            className="h-[420px]"
            text="hi"
          ></iframe>

          <span className="ml-2 mb-3 text-lg text-gray-600 line-clamp-3">
            {videoInfo.videoDescription}
          </span>

          <div className="flex flex-row-reverse">
            <img
              src={likeVideo ? heartFill : heart}
              alt="heart"
              id="videocontainer-heart-icon"
              onClick={() => handleLike()}
              className="self-center w-[20px] h-[20px]"
            />
            <h4 className=" mr-2 text-s text-sky-600">
              {videoInfo.likedBy ? videoInfo.likedBy.length : "-"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
