import React from "react";
import Navbar from "./components/Navbar";
import VideoContainer from "./components/VideoContainer";

export default function HomePage() {
  return (
    <div className="min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar />
      <VideoContainer />
      <VideoContainer />
    </div>
  );
}
