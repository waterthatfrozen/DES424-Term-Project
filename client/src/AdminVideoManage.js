import axios from "axios";
import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminUserManage(props) {
  const navigateTo = useNavigate();
  const [updateCount, setUpdateCount] = React.useState(0);
  const USER_ID = new URLSearchParams(window.location.search).get("userID");
  const [USERNAME, setUSERNAME] = React.useState("");
  const [userVideoList, setUserVideoList] = React.useState([]);
  const adminInfo = props.adminInfo;

  React.useEffect(() => {
    if (adminInfo.userLevel !== "admin") {
      navigateTo("/");
    }
  }, [adminInfo]);

  React.useEffect(() => {
    async function fetchUser() {
      await axios
        .get(
          `https://api-quickvid.azurewebsites.net/fetchUser?userID=${USER_ID}`
        )
        .then((response) => {
          // console.log(response.data);
          setUSERNAME(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function fetchUserVideo() {
      await axios
        .get(
          `https://api-quickvid.azurewebsites.net/listUserVideo?userID=${USER_ID}`
        )
        .then((response) => {
          let temp = response.data.videos;
          if (temp) {
            temp.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
            setUserVideoList(temp);
          }
          fetchUser();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUserVideo();
  }, [updateCount, USER_ID]);

  async function handleDelete(event) {
    if (await window.confirm("Do you want to delete this video?")) {
      let targetVideoID = event.target.value;
      await axios
        .delete(
          `https://api-quickvid.azurewebsites.net/deleteVideoAsset?videoID=${targetVideoID}&userID=${USER_ID}`
        )
        .then((response) => {
          window.alert(response.data.message);
          setUpdateCount(updateCount + 1);
        })
        .catch((error) => {
          window.alert(error);
          console.error(error);
        });
    }
  }

  function createVideoManage() {
    // index+1 videoID assetName timestamp likecount
    function createRow(index, videoID, videoAssetName, timestamp, likeCount) {
      return (
        <tr
          key={videoID}
          className="odd:bg-gray-50 even:bg-gray-200 hover:bg-gray-300"
        >
          <th>{index + 1}</th>
          <td>{videoID}</td>
          <td>{videoAssetName}</td>
          <td className="text-center">
            {new Date(timestamp).toLocaleString("en-GB", {
              timeZone: "Asia/Bangkok",
              hour12: false,
            })}
          </td>
          <td className="text-center">
            {likeCount >= 1 ? likeCount + " likes" : likeCount + " like"}
          </td>
          <td className="py-2 px-3">
            {/* Delete Video Button */}
            <button
              id="admin-video-delete-btn"
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 w-full rounded-lg"
              value={videoID}
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }

    if (userVideoList.length > 0) {
      return userVideoList.map((video, index) => {
        return createRow(
          index,
          video._id,
          video.assetName.substr(7, video.assetName.length - 51),
          video.timestamp,
          video.likedBy.length
        );
      });
    } else {
      return (
        <tr>
          <td
            colSpan="6"
            className="text-center bg-red-700 text-white p-3 font-medium"
          >
            <i className="bi bi-film"></i> No video uploaded
          </td>
        </tr>
      );
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
        <Navbar page="admin" />
        <div className="mt-14 pb-3 w-4/5">
          <button
            id="admin-video-back-btn"
            onClick={() => navigateTo("/admin-user")}
            className="text-dark-700 hover:text-dark-900"
          >
            <i className="bi bi-arrow-left-square-fill"></i> Back to user list
          </button>
          <h1 className="text-4xl font-medium text-dark-500 my-3 align-center">
            <i className="bi bi-film"></i> Admin Video Management
          </h1>
          <h2 className="text-xl text-dark-500 my-3">
            List of videos uploaded by user{" "}
            <span className="font-bold">{USERNAME}</span>
          </h2>
          <table className="w-full rounded-t-lg">
            <thead>
              <tr className="bg-sky-700 text-white ">
                <th className="p-4">#</th>
                <th className="p-4">Video ID</th>
                <th className="p-4">Video Asset Name</th>
                <th className="p-4">Upload Date</th>
                <th className="p-4">Like Count</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>{createVideoManage()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
