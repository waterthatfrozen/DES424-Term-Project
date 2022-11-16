import React from "react";

export default function VideoPlayer() {
  const playerElement = React.useRef();

  React.useEffect(() => {
    var myPlayer = window.amp(
      playerElement.current,
      {
        /* Options */ nativeControlsForTouch: false,
        autoplay: false,
        controls: true,
        // width: "600",
        // height: "400",
        poster: "",
      },
      function () {
        // console.log("Good to go!");
        // add an event listener
        this.addEventListener("ended", function () {
          //console.log('Finished!');
        });
      }
    );
    myPlayer.src([
      {
        src: "https://quickvid-aaea.streaming.media.azure.net/0cc8ff47-6684-4623-97f9-b57b013c7c98/gtws.ism/manifest",
        type: "application/vnd.ms-sstr+xml",
      },
    ]);
  }, []);

  return (
    <div>
      <video
        id="videoPlayer"
        className="azuremediaplayer amp-default-skin"
        width="auto"
        height="400px"
        // autoplay
        controls
        ref={playerElement}
      >
        <source src="" type="application/vnd.ms-sstr+xml" />
        <p className="amp-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video
        </p>
      </video>
    </div>
  );
}
