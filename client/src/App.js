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

/*
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token (1105:8)
 @ ./~/react-router-dom/dist/umd/react-router-dom.development.js 12:125-153
*/

function App() {
  const [userInfo, setUserInfo] = React.useState([]);

  React.useEffect(() => {
    if (userInfo) {
      sessionStorage.setItem("user-name", userInfo.username);
      sessionStorage.setItem("user-id", userInfo.userID);
    }

    // console.log(sessionStorage.getItem("user-id"));
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
            element={<LoginPage userInfo={(data) => setUserInfo(data)} />}
          ></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/admin-user" element={<AdminUserManage />}></Route>
          <Route path="/admin-video" element={<AdminVideoManage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
