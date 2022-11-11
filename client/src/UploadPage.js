import React from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

export default function UploadPage() {
  const [formData, setFormData] = React.useState({
    file: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.file === "") {
      alert("Please insert video file");
    } else {
      // pass อะไรไปบ้าง
      await axios
        .post(
          "https://quickvidapp.azurewebsites.net/api/createVideoAsset",
          formData
        )
        .then((res) => {
          console.log(res);
          alert("Video Uploaded Successfully");
        })
        .catch((err) => {
          console.log(err);
          alert("Video Upload Failed");
        });
    }
  }

  return (
    <div className="flex flex-col min-h-screen max-h-full bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
      <Navbar page="upload" />

      <form className="flex flex-col p-10">
        <h1 className="self-center ml-5 text-4xl mb-10 text-gray-80">
          Upload Your Video
        </h1>

        <div className="flex self-center w-80 md:w-1/2 h-80  mb-5 rounded-xl bg-white">
          <input
            type="file"
            name="file"
            onChange={handleChange}
            value={formData.file}
            className="self-center block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-200 file:text-gray-80
                    hover:file:bg-gray-300
                  "
          />
        </div>

        <input
          className="self-center w-80 md:w-1/2  h-16  pl-2 mb-5 rounded-xl"
          placeholder="Write caption here ..."
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />

        <button
          onClick={handleSubmit}
          className=" self-center w-80 md:w-1/2  h-12 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
