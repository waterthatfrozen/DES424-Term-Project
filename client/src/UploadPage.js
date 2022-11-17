import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import spinner from "./assets/spinner.gif";

export default function UploadPage() {
  const navigateTo = useNavigate();
  const userInfo = {
    username: sessionStorage.getItem("user-name"),
    userID: sessionStorage.getItem("user-id"),
  };
  const [formData, setFormData] = React.useState({
    userID: userInfo.userID,
    videoDescription: "",
  });
  const [file, setFile] = React.useState({});
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    if (
      userInfo.userID === undefined ||
      userInfo.userID === null ||
      userInfo.userID === "undefined"
    ) {
      navigateTo("/login");
    }
    // eslint-disable-next-line
  }, [navigateTo]);

  function handleChange(event) {
    let form = document.querySelector("form");
    const { name, value } = event.target;
    let data = new FormData(form);
    if (value.length <= 300 && name !== "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (name === "file") {
      setFile(data.get("file"));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);
    const sendForm = { ...formData, file };
    if (formData.file === "") {
      alert("Please insert video file");
    } else {
      setShowLoader(true);
      await axios
        .post(
          "https://api-quickvid.azurewebsites.net/createVideoAsset",
          sendForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(() => {
          alert("Video Uploaded Successfully");
          setShowLoader(false);
          navigateTo("/user");
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

      {showLoader && (
        <div className="flex flex-col justify-center items-center absolute min-h-screen w-screen mt-[70px] bg-gray-300/75">
          <h1 className="text-4xl font-bold text-gray-700">Uploading</h1>
          <img src={spinner} alt="spinner" />
        </div>
      )}

      <form className="flex flex-col p-10" onSubmit={handleSubmit} id="form">
        <h1 className="self-center ml-5 text-4xl mb-10 text-gray-800">
          Upload Your Video
        </h1>

        <div className="flex self-center justify-center items-center w-80 md:w-1/2 h-80  mb-5 rounded-xl bg-white">
          <input
            type="file"
            name="file"
            id="upload-choosefile-btn"
            onChange={handleChange}
            value={formData.file}
            accept="video/*"
            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-200 file:text-gray-80
                    hover:file:bg-gray-300
                  "
          />
        </div>

        <div className="self-center w-80 md:w-1/2">
          <textarea
            className="w-full h-40  p-4 rounded-xl"
            placeholder="Write description here ..."
            name="videoDescription"
            id="upload-description-input"
            onChange={handleChange}
            value={formData.videoDescription}
          ></textarea>
          <p className="text-end mb-5">
            {formData.videoDescription.length}/300
          </p>
        </div>
        <button
          id="upload-submit-btn"
          className=" self-center w-80 md:w-1/2  h-12 mb-4 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
