import React from "react";
import "./css/404style.css";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center h-screen  mt-40 body">
      <div className="text-9xl text-white font-bold">404</div>
      <div className="text-6xl text-white font-bold">Page Not Found</div>
    </div>
  );
}
