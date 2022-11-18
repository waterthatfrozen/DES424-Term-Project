import axios from "axios";
import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminUserManage(props) {
  const navigateTo = useNavigate();
  const [updateCount, setUpdateCount] = React.useState(0);
  const [userList, setUserList] = React.useState([]);
  const adminInfo = props.adminInfo;

  React.useEffect(() => {
    let sessionID = sessionStorage.getItem("user-id");
    if (
      // adminInfo.userLevel !== "admin" ||
      sessionID !== "636fe2f49778302858c4c588"
    ) {
      navigateTo("/");
    }
  }, [adminInfo, navigateTo]);

  React.useEffect(() => {
    async function fetchUser() {
      await axios
        .get("https://api-quickvid.azurewebsites.net/fetchAllUsers")
        .then((response) => {
          // console.log(response.data);
          let temp = response.data;
          temp.sort((a, b) => b.created.localeCompare(a.created));
          temp = temp.filter((user) => user.userLevel !== "admin");
          setUserList(temp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUser();
  }, [updateCount]);

  async function handleDeactivate(event) {
    if (await window.confirm("Do you want to deactivate this user?")) {
      let targetUsername = event.target.value;
      await axios
        .post("https://api-quickvid.azurewebsites.net/deactivateUser", {
          username: targetUsername,
        })
        .then((response) => {
          window.alert(response.data.message);
          setUpdateCount(updateCount + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async function handleActivate(event) {
    if (await window.confirm("Do you want to activate this user?")) {
      let targetUsername = event.target.value;
      await axios
        .post("https://api-quickvid.azurewebsites.net/activateUser", {
          username: targetUsername,
        })
        .then((response) => {
          window.alert(response.data.message);
          setUpdateCount(updateCount + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async function handleUserVideo(event) {
    let targetUserID = event.target.value;
    // console.log(targetUserID);
    // window.location.href = "/admin-video?userID=" + targetUserID;
    navigateTo({
      pathname: "/admin-video",
      search: `?userID=${targetUserID}`,
    });
  }

  function createUserManage() {
    function createRow(index, userID, username, email, timestamp, status) {
      return (
        <tr
          key={userID}
          className="odd:bg-gray-50 even:bg-gray-200 hover:bg-gray-300"
        >
          <th>{index + 1}</th>
          <td>{username}</td>
          <td>{email}</td>
          <td className="text-center">
            {new Date(timestamp).toLocaleString("en-GB", {
              timeZone: "Asia/Bangkok",
              hour12: false,
            })}
          </td>
          <td className="text-center">
            {status ? (
              <span className="bi bi-check-square-fill text-green-700">
                {" "}
                Activated
              </span>
            ) : (
              <span className="bi bi-x-square-fill text-red-700">
                {" "}
                Deactivated
              </span>
            )}
          </td>
          <td className="py-2 px-3">
            {status ? (
              <button
                id="admin-user-deactivate-btn"
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 w-1/2 rounded-l-lg rounded-r-none"
                onClick={handleDeactivate}
                value={username}
              >
                Deactivate
              </button>
            ) : (
              <button
                id="admin-user-activate-btn"
                className="bg-green-700 hover:bg-green-500 text-white py-1 px-3 rounded-l-lg rounded-r-none w-1/2"
                onClick={handleActivate}
                value={username}
              >
                Activate
              </button>
            )}
            <button
              id="admin-user-uvl-btn"
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-l-none rounded-r-lg w-1/2"
              onClick={handleUserVideo}
              value={userID}
              name={username}
            >
              User Video List
            </button>
          </td>
        </tr>
      );
    }

    return userList.map((user, index) => {
      return createRow(
        index,
        user._id,
        user.username,
        user.email,
        user.created,
        user.activated
      );
    });
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
        <Navbar page="admin" />
        <div className="mt-14 pb-3 w-4/5">
          <h1 className="text-4xl font-medium text-dark-500 my-3 align-center">
            <span className="bi bi-person-circle"></span> Admin User Management
          </h1>
          <table className="w-full rounded-t-lg">
            <thead>
              <tr className="bg-sky-700 text-white ">
                <th className="p-4">#</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Created Date</th>
                <th className="p-4">Activation Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>{createUserManage()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
