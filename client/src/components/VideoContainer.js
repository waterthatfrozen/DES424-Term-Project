import React from "react";
import heart from "../assets/heart.png";
import heartFill from "../assets/heart-fill.png";
import bin from "../assets/bin.png";

export default function VideoContainer(props) {
  const [likeCount, setLikeCount] = React.useState(0);
  const [likeVideo, setLikeVideo] = React.useState(false);
  const showBin = props.showBin;

  React.useEffect(() => {
    let infoUser = props.info;
    localStorage.setItem(`infoUser${infoUser.id}`, JSON.stringify(infoUser));
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col  md:w-1/2 p-10  bg-white/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full bg-slate-200`}>
                <p className="flex items-center justify-center h-full text-5xl font-bold text-neutral-800 ">
                  {props.userName[0].toUpperCase()}
                </p>
              </div>
              <h2 className="w-40 lg:w-72 ml-5 text-xl text-gray-800 overflow-hidden text-ellipsis">
                {props.userName}mmmmmmmmmmmmmmmmpppppppppppppppp
              </h2>
            </div>

            {showBin && (
              <img
                src={bin}
                alt="bin"
                className="w-8 h-8 cursor-pointer"
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </span>

          <div className="flex flex-row-reverse">
            <img
              src={likeVideo ? heartFill : heart}
              alt="heart"
              onClick={() => {
                // setLikeCount((prev) => prev + 1);
                setLikeVideo((prve) => {
                  if (!prve) {
                    setLikeCount((prev) => prev + 1);
                  } else {
                    setLikeCount((prev) => prev - 1);
                  }
                  return !prve;
                });
              }}
              className="self-center w-[20px] h-[20px]"
            />
            <h4 className=" mr-2 text-s text-sky-600">
              {likeCount} {likeCount > 1 ? "Likes" : "Like"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
