import React from "react";
import userImg from "../assets/user-img.jpeg";
import heart from "../assets/heart.png";
import chat from "../assets/chat.png";

export default function VideoContainer() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col  md:w-1/2 p-10  bg-white/20">
        <div className="flex items-center mb-5">
          <img
            src={userImg}
            alt="user_img"
            className="self-center w-16 h-16 object-cover rounded-full"
          />
          <h2 className="ml-5 text-xl text-gray-800">User Name</h2>
        </div>

        <video
          id="vid1"
          className="mb-5 bg-current"
          autoplay
          controls
          // width="640"
          // height="400"
          poster="poster.jpg"
          data-setup='{"techOrder": ["azureHtml5JS", "flashSS", "html5FairPlayHLS","silverlightSS", "html5"], "nativeControlsForTouch": false}'
        >
          <source
            src="http://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest"
            type="application/vnd.ms-sstr+xml"
          />
          <p>
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that supports HTML5 video
          </p>
        </video>

        <span className="mb-3 text-s text-gray-600 line-clamp-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.{" "}
        </span>

        <div className="flex justify-between">
          <h4 className="text-s text-sky-600">3 Likes</h4>
          <div className="flex">
            <img
              src={heart}
              alt="heart"
              className="self-center w-[20px] h-[20px] mr-5"
            />
            <img
              src={chat}
              alt="chat"
              className="self-center w-[20px] h-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
