import React from "react";
import Navbar from "./components/Navbar";

export default function UploadPage() {
  return (
    <div className="flex flex-col min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar />

      <form className="flex flex-col p-10">
        <h1 className="self-center ml-5 text-4xl mb-10 text-gray-80">
          Upload Your Video
        </h1>
        <div className="flex self-center w-80 md:w-1/2 h-80  mb-5 rounded-xl bg-slate-300">
          <input
            type="file"
            className="self-center block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-gray-80
                    hover:file:bg-slate-200
                    
                  "
          />
        </div>
        <input
          className="self-center w-80 md:w-1/2  h-16  pl-2 mb-5 rounded-xl"
          type="text"
          placeholder="Write caption here ..."
          name="text"
          // onChange={handleChange}
          // value={formdata.username}
        />
        <button className=" self-center w-80 md:w-1/2  h-12 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
          Submit
        </button>
      </form>
    </div>
  );
}
