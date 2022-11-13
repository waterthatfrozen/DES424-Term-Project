import React from "react";
import axios from "axios";
import heart from "../assets/heart.png";
import heartFill from "../assets/heart-fill.png";
import bin from "../assets/bin.png";

export default function VideoContainer(props) {  
  const videoInfo = props.info
  const currentUserID = sessionStorage.getItem("user-id");
  const [likeCount, setLikeCount] = React.useState(0);
  const [likeVideo, setLikeVideo] = React.useState(false);
  const showBin = props.showBin;

  React.useEffect(() => {
    localStorage.setItem(`infoUser${videoInfo.id}`, JSON.stringify(videoInfo));
  }, []);

  function handleLike() {
    console.log(currentUserID);
    if(currentUserID === null || currentUserID === undefined || currentUserID === "undefined"){
      alert("Please login to like the video");
    }else{
      let liked = videoInfo.likedBy.includes(currentUserID);
      setLikeVideo(liked);
    }
  }

  async function handleSendLike() {
    await axios.post("https://api-quickvid.azurewebsites.net/likeVideo", {

    })
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col  md:w-2/3 lg:w-1/2 p-10  bg-white/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full bg-slate-200`}>
                <p className="flex items-center justify-center h-full text-5xl font-bold text-neutral-800 ">
                  {videoInfo.username ? videoInfo.username[0].toUpperCase() : "-"}
                </p>
              </div>
              <h2 className="w-40 lg:w-72 ml-5 text-xl text-gray-800 overflow-hidden text-ellipsis">
                {videoInfo.username}
              </h2>
            </div>

            {showBin && (
              <img
                src={bin}
                alt="bin"
                className="w-8 h-8 mr-3 cursor-pointer"
                onClick={() => console.log("click delete")}
              />
            )}
          </div>

          <iframe
            title="videp player"
            src="videoPlayer.html"
            className="h-[420px]"
            text="hi"
          ></iframe>

          <span className="mb-3 text-s text-gray-600 line-clamp-3">
            {videoInfo.videoDescription}
          </span>

          <div className="flex flex-row-reverse">
            <img
              src={likeVideo ? heartFill : heart}
              alt="heart"
              onClick={() => handleLike() }
              className="self-center w-[20px] h-[20px]"
            />
            <h4 className=" mr-2 text-s text-sky-600">
              {/* {videoInfo.likedBy.length ? videoInfo.likedBy.length : "-"} */}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
