import React from "react";

export default function AdminUserManage() {
  const listUser = {
    username: "admin",
    status: "active"
  }

  function createUserManage() {
    return (
      <tr>
        <td className="p-3 text-center bg-sky-200">{listUser.username}</td>
        <td className="p-3 text-center bg-sky-200 cursor-pointer">{listUser.status}</td>
      </tr>
    );
  }
  return (
    <div>
      <div className="flex flex-col items-center h-screen  bg-gradient-to-r from-[#80d1e6] to-[#c7ecf7]">
        <h1 className="text-3xl font-medium text-dark-500 mt-32 mb-10">Admin User Manage</h1>
        <table className="w-2/5">
          <thead>
            <tr>
              <th className="p-4 bg-sky-100">User Name</th>
              <th className="p-4 bg-sky-100">User Status</th>
            </tr>
          </thead>
          <tbody>
            {createUserManage()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
