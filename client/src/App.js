// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UserPage from "./UserPage";
import UploadPage from "./UploadPage";
import AdminUserManage from "./AdminUserManage";
import AdminVideoManage from "./AdminVideoManage";
import PageNotFound from "./PageNotFound";

function App() {
  const [userInfo, setUserInfo] = React.useState([]);
  let oldSessionID = sessionStorage.getItem("user-id");

  React.useEffect(() => {
    if (userInfo.userID && oldSessionID === "null") {
      sessionStorage.setItem("user-name", userInfo.username);
      sessionStorage.setItem("user-id", userInfo.userID);
    }
  }, [userInfo]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user" element={<UserPage />}></Route>
          <Route path="/upload" element={<UploadPage />}></Route>
          <Route
            path="/login"
            element={
              <LoginPage
                userInfo={(data) => {
                  if (data) {
                    setUserInfo(data);
                  }
                }}
              />
            }
          ></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route
            path="/admin-user"
            element={<AdminUserManage adminInfo={userInfo} />}
          ></Route>
          <Route
            path="/admin-video"
            element={<AdminVideoManage adminInfo={userInfo} />}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
